// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

contract GreenTrustFarmer {
    enum CropStatus {
        OPEN,
        LOCKED,
        CLOSED
    }
    enum StakeStatus {
        STAKED,
        RELEASED,
        UNSUCCESSFUL
    }

    CropStatus public constant defaultCropStatus = CropStatus.OPEN;
    StakeStatus public constant defaultStakeStatus = StakeStatus.STAKED;

    struct Farmer {
        uint256 id;
        address payable walletAddress;
        string profile;
        string idCards;
        bool isValid;
    }
    mapping(address => uint256) public addressToFarmerIds;
    mapping(uint256 => Farmer) public farmers;
    uint256 public numFarmers;
    struct Farm {
        uint256 id;
        string name;
        string size;
        string latitude;
        string longitude;
        string location;
        uint256 farmerId;
        string documents;
        bool isValid;
    }
    mapping(uint256 => Farm) public farms;
    uint256 public numFarms;

    struct Crop {
        uint256 id;
        uint256 harvestedOn;
        string details;
        uint256 stakeAmount;
        uint256 farmId;
        CropStatus status;
        bool isValid;
    }
    mapping(uint256 => Crop) public crops;
    mapping(uint256 => mapping(address => bool)) public hasStaked;
    uint256 public numCrops;

    struct Sensor {
        uint256 id;
        uint256 cropId;
        string name;
        string prevData;
        string data;
        bool isValid;
    }
    mapping(uint256 => Sensor) public sensors;
    uint256 public numSensors;

    struct Stake {
        uint256 id;
        uint256 cropId;
        address payable stakeholder;
        StakeStatus status;
        bool isValid;
    }
    mapping(uint256 => Stake) public stakes;
    uint256 public numStakes;

    function addFarm(
        string memory _size,
        string memory _name,
        string memory _latitude,
        string memory _longitude,
        string memory _location,
        string memory _documents
    ) public {
        require(addressToFarmerIds[msg.sender] != 0, "F0F");
        numFarms++;
        farms[numFarms].id = numFarms;
        farms[numFarms].size = _size;
        farms[numFarms].name = _name;
        farms[numFarms].latitude = _latitude;
        farms[numFarms].longitude = _longitude;
        farms[numFarms].location = _location;
        farms[numFarms].farmerId = addressToFarmerIds[msg.sender];
        farms[numFarms].documents = _documents;
        farms[numFarms].isValid = true;
    }

    function addCrop(
        string memory _details,
        uint256 _harvestedOn,
        uint256 _farmId,
        uint256 _stakeAmount
    ) public {
        require(addressToFarmerIds[msg.sender] != 0, "F0C");
        require(
            farms[_farmId].farmerId == addressToFarmerIds[msg.sender],
            "F0C"
        );
        numCrops++;
        crops[numCrops].id = numCrops;
        crops[numCrops].harvestedOn = _harvestedOn;
        crops[numCrops].stakeAmount = _stakeAmount;
        crops[numCrops].details = _details;
        crops[numCrops].farmId = _farmId;
        crops[numCrops].status = defaultCropStatus;
        crops[numCrops].isValid = true;
    }

    function addSensor(uint256 _cropId, string memory _name) public {
        require(addressToFarmerIds[msg.sender] != 0, "F0S");
        require(crops[_cropId].isValid, "Cr0");
        require(
            farms[crops[_cropId].farmId].farmerId ==
                addressToFarmerIds[msg.sender],
            "F0S"
        );
        numSensors++;
        sensors[numSensors].id = numSensors;
        sensors[numSensors].cropId = _cropId;
        sensors[numSensors].name = _name;
        sensors[numSensors].isValid = true;
    }

    function addSensorData(uint256 _sensorId, string memory _data) public {
        require(sensors[_sensorId].isValid, "S0");
        sensors[_sensorId].prevData = sensors[_sensorId].data;
        sensors[_sensorId].data = _data;
    }

    function fetchFarmerFarms(uint256 _farmerId)
        public
        view
        returns (Farm[] memory)
    {
        require(
            (_farmerId > 0 && _farmerId <= numFarmers) ||
                addressToFarmerIds[msg.sender] > 0,
            "F0"
        );
        if (_farmerId == 0) {
            _farmerId = addressToFarmerIds[msg.sender];
        }
        uint256 tempNumFarms;
        uint256 j;
        for (uint256 i = 1; i <= numFarms; i++) {
            if (farms[i].farmerId == _farmerId && farms[i].isValid) {
                tempNumFarms++;
            }
        }
        Farm[] memory temp = new Farm[](tempNumFarms);
        for (uint256 i = 1; i <= numFarms; i++) {
            if (farms[i].farmerId == _farmerId && farms[i].isValid) {
                temp[j] = farms[i];
                j++;
            }
        }
        return temp;
    }

    function fetchCropSensors(uint256 _cropId)
        public
        view
        returns (Sensor[] memory)
    {
        require(
            _cropId > 0 && _cropId <= numCrops && crops[_cropId].isValid,
            "Cr0"
        );
        uint256 tempNumSensors;
        uint256 j;
        for (uint256 i = 1; i <= numSensors; i++) {
            if (sensors[i].cropId == _cropId && sensors[i].isValid) {
                tempNumSensors++;
            }
        }
        Sensor[] memory temp = new Sensor[](tempNumSensors);
        for (uint256 i = 1; i <= numSensors; i++) {
            if (sensors[i].cropId == _cropId && sensors[i].isValid) {
                temp[j] = sensors[i];
                j++;
            }
        }
        return temp;
    }

    function fetchCropStakes(uint256 _cropId)
        public
        view
        returns (Stake[] memory)
    {
        require(
            _cropId > 0 && _cropId <= numCrops && crops[_cropId].isValid,
            "Cr0"
        );
        uint256 tempNumStakes;
        uint256 j;
        for (uint256 i = 1; i <= numStakes; i++) {
            if (stakes[i].cropId == _cropId && stakes[i].isValid) {
                tempNumStakes++;
            }
        }
        Stake[] memory temp = new Stake[](tempNumStakes);
        for (uint256 i = 1; i <= numStakes; i++) {
            if (stakes[i].cropId == _cropId && stakes[i].isValid) {
                temp[j] = stakes[i];
                j++;
            }
        }
        return temp;
    }

    function fetchFarmCrops(uint256 _farmId)
        public
        view
        returns (Crop[] memory cropList)
    {
        require(
            _farmId > 0 && _farmId <= numFarms && farms[_farmId].isValid,
            "F0"
        );
        uint256 tempNumCrops;
        uint256 j;
        for (uint256 i = 1; i <= numCrops; i++) {
            if (crops[i].farmId == _farmId && crops[i].isValid) {
                tempNumCrops++;
            }
        }
        Crop[] memory temp = new Crop[](tempNumCrops);
        for (uint256 i = 1; i <= numCrops; i++) {
            if (crops[i].farmId == _farmId && crops[i].isValid) {
                temp[j] = crops[i];
                j++;
            }
        }
        return temp;
    }

    function fetchFarmerStakes(uint256 _farmerId)
        public
        view
        returns (Stake[] memory)
    {
        require(
            (_farmerId > 0 && _farmerId <= numFarmers) ||
                addressToFarmerIds[msg.sender] != 0,
            "F0"
        );
        if (_farmerId == 0) {
            _farmerId = addressToFarmerIds[msg.sender];
        }
        uint256 tempNumStakes;
        uint256 j;
        for (uint256 i = 1; i <= numStakes; i++) {
            if (stakes[i].stakeholder == msg.sender && stakes[i].isValid) {
                tempNumStakes++;
            }
        }
        Stake[] memory temp = new Stake[](tempNumStakes);
        for (uint256 i = 1; i <= numStakes; i++) {
            if (stakes[i].stakeholder == msg.sender && stakes[i].isValid) {
                temp[j] = stakes[i];
                j++;
            }
        }
        return temp;
    }

    function fetchAllFarms() public view returns (Farm[] memory) {
        Farm[] memory temp = new Farm[](numFarms);
        for (uint256 i = 1; i <= numFarms; i++) {
            temp[i - 1] = farms[i];
        }
        return temp;
    }

    function cropHarvested(uint256 _cropId) public {
        require(
            crops[_cropId].isValid
        );
        require(
            farms[crops[_cropId].farmId].farmerId ==
                addressToFarmerIds[msg.sender],
            "F0S"
        );
        require(
            crops[_cropId].harvestedOn == 0,
            "Cr0H");
        crops[_cropId].harvestedOn = block.timestamp;

    }
}
