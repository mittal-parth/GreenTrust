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
    mapping(address => uint256) internal addressToFarmerIds;
    mapping(uint256 => Farmer) internal farmers;
    uint256 numFarmers;
    event farmerRegistered(address indexed farmerAddress, uint256 id);
    event farmerUpdated(address indexed farmerAddress, uint256 id);

    struct Farm {
        uint256 id;
        string size;
        string latitude;
        string longitude;
        string location;
        uint256 farmerId;
        string documents;
        bool isValid;
    }
    mapping(uint256 => Farm) farms;
    uint256 numFarms;
    event farmAdded(uint256 farmId, uint256 farmerId);

    struct Crop {
        uint256 id;
        string details;
        uint256 farmId;
        CropStatus status;
        bool isValid;
    }
    mapping(uint256 => Crop) crops;
    uint256 numCrops;

    struct Sensor {
        uint256 id;
        uint256 cropId;
        string data;
        bool isValid;
    }
    mapping(uint256 => Sensor) sensors;
    uint256 numSensors;
    event sensorAdded(uint256 id, uint256 cropId);
    event sensorDataAdded(uint256 sensorId, string data);

    struct Stake {
        uint256 id;
        uint256 amount;
        uint256 cropId;
        address payable stakeholder;
        StakeStatus status;
        bool isValid;
    }
    mapping(uint256 => Stake) stakes;
    uint256 numStakes;
    event stakeAdded(
        uint256 id,
        uint256 cropId,
        uint256 amount,
        address stakeholder
    );

    // Functions for farmers
    function fetchFarmerProfile() public view returns (Farmer memory) {
        require(addressToFarmerIds[msg.sender] != 0, "F0");
        return farmers[addressToFarmerIds[msg.sender]];
    }

    function updateFarmerProfile(
        string memory _profile,
        string memory _idCards
    ) public {
        require(addressToFarmerIds[msg.sender] != 0, "F0");
        farmers[addressToFarmerIds[msg.sender]].profile = _profile;
        farmers[addressToFarmerIds[msg.sender]].idCards = _idCards;
        emit farmerUpdated(msg.sender, addressToFarmerIds[msg.sender]);
    }

    function addFarm(
        string memory _size,
        string memory _latitude,
        string memory _longitude,
        string memory _location,
        string memory _documents
    ) public {
        require(addressToFarmerIds[msg.sender] != 0, "F0F");
        farms[numFarms + 1].id = numFarms + 1;
        farms[numFarms + 1].size = _size;
        farms[numFarms + 1].latitude = _latitude;
        farms[numFarms + 1].longitude = _longitude;
        farms[numFarms + 1].location = _location;
        farms[numFarms + 1].farmerId = addressToFarmerIds[msg.sender];
        farms[numFarms + 1].documents = _documents;
        farms[numFarms + 1].isValid = true;
        numFarms++;
        emit farmAdded(numFarms, addressToFarmerIds[msg.sender]);
    }

    function addCrop(string memory _details, uint256 _farmId) public {
        require(addressToFarmerIds[msg.sender] != 0, "F0C");
        require(
            farms[_farmId].farmerId == addressToFarmerIds[msg.sender],
            "F0C"
        );
        crops[numCrops + 1].id = numCrops + 1;
        crops[numCrops + 1].details = _details;
        crops[numCrops + 1].farmId = _farmId;
        crops[numCrops + 1].status = defaultCropStatus;
        crops[numCrops + 1].isValid = true;
        numCrops++;
    }

    function addSensor(uint256 _cropId, string memory _data) public {
        require(addressToFarmerIds[msg.sender] != 0, "F0S");
        require(crops[_cropId].isValid, "Cr0");
        require(
            farms[crops[_cropId].farmId].farmerId ==
                addressToFarmerIds[msg.sender],
            "F0S"
        );
        sensors[numSensors + 1].id = numSensors + 1;
        sensors[numSensors + 1].cropId = _cropId;
        sensors[numSensors + 1].data = _data;
        sensors[numSensors + 1].isValid = true;
        numSensors++;
        emit sensorAdded(numSensors, _cropId);
    }

    function addSensorData(uint256 _sensorId, string memory _data) public {
        require(addressToFarmerIds[msg.sender] != 0, "F0S");
        require(sensors[_sensorId].isValid, "S0");
        require(
            farms[crops[sensors[_sensorId].cropId].farmId].farmerId ==
                addressToFarmerIds[msg.sender],
            "F0S"
        );
        //to discuss status code
        require(
            crops[sensors[_sensorId].cropId].status == CropStatus.OPEN,
            "Cr0"
        );
        sensors[_sensorId].data = _data;
        emit sensorDataAdded(_sensorId, _data);
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
        uint256 queryFarmer;
        if (_farmerId > 0) {
            queryFarmer = _farmerId;
        } else {
            queryFarmer = addressToFarmerIds[msg.sender];
        }
        uint256 tempNumFarms;
        uint256 j;
        for (uint256 i = 1; i <= numFarms; i++) {
            if (farms[i].farmerId == queryFarmer && farms[i].isValid) {
                tempNumFarms++;
            }
        }
        Farm[] memory temp = new Farm[](tempNumFarms);
        for (uint256 i = 1; i <= numFarms; i++) {
            if (farms[i].farmerId == queryFarmer && farms[i].isValid) {
                temp[j] = farms[i];
                j++;
            }
        }
        return temp;
    }

    function fetchCropDetails(uint256 _cropId)
        public
        view
        returns (Crop memory)
    {
        require(
            _cropId > 0 && _cropId <= numCrops && crops[_cropId].isValid,
            "Cr0"
        );
        return crops[_cropId];
    }

    // used
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

    // used
    function fetchFarmDetails(uint256 _farmId)
        public
        view
        returns (
            Farm memory farm,
            Farmer memory farmer,
            Crop[] memory cropList
        )
    {
        require(
            _farmId > 0 && _farmId <= numFarms && farms[_farmId].isValid,
            "F0"
        );
        return (
            farms[_farmId],
            farmers[farms[_farmId].farmerId],
            fetchFarmCrops(_farmId)
        );
    }

    function fetchFarmerDetails(uint256 _farmerId)
        public
        view
        returns (Farmer memory)
    {
        require(
            _farmerId > 0 &&
                _farmerId <= numFarmers &&
                farmers[_farmerId].isValid,
            "F0"
        );
        return farmers[_farmerId];
    }

    function fetchSensorDetails(uint256 _sensorId)
        public
        view
        returns (Sensor memory)
    {
        require(
            _sensorId > 0 &&
                _sensorId <= numSensors &&
                sensors[_sensorId].isValid,
            "S0"
        );
        return sensors[_sensorId];
    }

    function fetchStakeDetails(uint256 _stakeId)
        public
        view
        returns (Stake memory)
    {
        require(
            _stakeId > 0 && _stakeId <= numStakes && stakes[_stakeId].isValid,
            "St0"
        );
        return stakes[_stakeId];
    }

    function fetchFarmerStakes() public view returns (Stake[] memory) {
        require(addressToFarmerIds[msg.sender] != 0, "F0St");
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
}
