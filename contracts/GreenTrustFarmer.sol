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
        string name;
        string currentAddress;
        string farmerId;
        string govtId;
        string[] idCards;
        bool isValid;
    }
    mapping(address => uint256) internal addressToFarmerIds;
    Farmer[] internal farmers;
    event farmerRegistered(
        address indexed farmerAddress,
        string name,
        uint256 id
    );
    event farmerUpdated(address indexed farmerAddress, string name, uint256 id);

    struct Farm {
        uint256 id;
        uint256 size;
        uint256 location;
        uint256 farmerId;
        string[] documents;
        bool isValid;
    }
    Farm[] internal farms;
    event farmAdded(uint256 farmId, uint256 farmerId);

    struct Crop {
        uint256 id;
        uint256 createdOn;
        uint256 sowedOn;
        uint256 size;
        uint256 farmId;
        string cropName;
        uint256 duration;
        CropStatus status;
        bool isValid;
    }
    Crop[] internal crops;

    struct Sensor {
        uint256 id;
        uint256 cropId;
        string data;
        bool isValid;
    }
    Sensor[] internal sensors;
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
    Stake[] internal stakes;
    event stakeAdded(
        uint256 id,
        uint256 cropId,
        uint256 amount,
        address stakeholder
    );

    // Functions for farmers
    function fetchFarmerProfile() public view returns (Farmer memory) {
        require(
            addressToFarmerIds[msg.sender] != 0,
            "Farmer not registered with this wallet"
        );
        return farmers[addressToFarmerIds[msg.sender] - 1];
    }

    function updateFarmerProfile(
        string memory _name,
        string memory _currentAddress,
        string memory _farmerId,
        string memory _govtId,
        string[] memory _idCards
    ) public returns (Farmer memory) {
        require(
            addressToFarmerIds[msg.sender] != 0,
            "Farmer not registered with this wallet"
        );
        Farmer memory temp = Farmer(
            addressToFarmerIds[msg.sender],
            payable(msg.sender),
            _name,
            _currentAddress,
            _farmerId,
            _govtId,
            _idCards,
            true
        );
        farmers[addressToFarmerIds[msg.sender] - 1] = temp;
        emit farmerUpdated(msg.sender, _name, addressToFarmerIds[msg.sender]);
        return farmers[addressToFarmerIds[msg.sender] - 1];
    }

    function AddFarm(
        uint256 _size,
        uint256 _location,
        string[] memory _documents
    ) public returns (Farm memory) {
        require(
            addressToFarmerIds[msg.sender] != 0,
            "Only registered farmers can add farms"
        );
        Farm memory temp = Farm(
            farms.length + 1,
            _size,
            _location,
            addressToFarmerIds[msg.sender],
            _documents,
            true
        );
        farms.push(temp);
        emit farmAdded(farms.length, addressToFarmerIds[msg.sender]);
        return farms[farms.length - 1];
    }

    function AddSensor(uint256 _cropId, string memory _data)
        public
        returns (Sensor memory)
    {
        require(
            addressToFarmerIds[msg.sender] != 0,
            "Only registered farmers can add sensors"
        );
        require(crops[_cropId].isValid, "Crop does not exist");
        require(
            farms[crops[_cropId].farmId].farmerId ==
                addressToFarmerIds[msg.sender],
            "Only registered farmers can add sensors to their crops"
        );
        Sensor memory temp = Sensor(sensors.length + 1, _cropId, _data, true);
        sensors.push(temp);
        emit sensorAdded(sensors.length, _cropId);
        return sensors[sensors.length - 1];
    }

    function AddSensorData(uint256 _sensorId, string memory _data)
        public
        returns (Sensor memory)
    {
        require(
            addressToFarmerIds[msg.sender] != 0,
            "Only registered farmers can add sensor data"
        );
        require(sensors[_sensorId].isValid, "Sensor does not exist");
        require(
            farms[crops[sensors[_sensorId].cropId].farmId].farmerId ==
                addressToFarmerIds[msg.sender],
            "Only registered farmers can add sensor data to their sensors"
        );
        //to discuss status code
        require(
            crops[sensors[_sensorId].cropId].status == CropStatus.OPEN,
            "Crop does not exist"
        );
        sensors[_sensorId].data = _data;
        emit sensorDataAdded(_sensorId, _data);
        return sensors[_sensorId];
    }

    function FetchFarmerFarms(uint256 _farmerId)
        public
        view
        returns (Farm[] memory)
    {
        require(
            (_farmerId > 0 && _farmerId <= farmers.length) ||
                addressToFarmerIds[msg.sender] > 0,
            "Farmer does not exist"
        );
        uint256 queryFarmer;
        if (_farmerId > 0) {
            queryFarmer = _farmerId;
        } else {
            queryFarmer = addressToFarmerIds[msg.sender];
        }
        uint256 numFarms;
        uint256 j;
        for (uint256 i = 0; i < farms.length; i++) {
            if (farms[i].farmerId == queryFarmer && farms[i].isValid) {
                numFarms++;
            }
        }
        Farm[] memory temp;
        for (uint256 i = 0; i < farms.length; i++) {
            if (farms[i].farmerId == queryFarmer && farms[i].isValid) {
                temp[j] = farms[i];
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
            _cropId > 0 && _cropId <= crops.length && crops[_cropId].isValid,
            "Crop does not exist"
        );
        return crops[_cropId];
    }

    function fetchFarmDetails(uint256 _farmId)
        public
        view
        returns (Farm memory)
    {
        require(
            _farmId > 0 && _farmId <= farms.length && farms[_farmId].isValid,
            "Farm does not exist"
        );
        return farms[_farmId];
    }

    function fetchFarmerDetails(uint256 _farmerId)
        public
        view
        returns (Farmer memory)
    {
        require(
            _farmerId > 0 &&
                _farmerId <= farmers.length &&
                farmers[_farmerId].isValid,
            "Farmer does not exist"
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
                _sensorId <= sensors.length &&
                sensors[_sensorId].isValid,
            "Sensor does not exist"
        );
        return sensors[_sensorId];
    }

    function fetchStakeDetails(uint256 _stakeId)
        public
        view
        returns (Stake memory)
    {
        require(
            _stakeId > 0 &&
                _stakeId <= stakes.length &&
                stakes[_stakeId].isValid,
            "Stake does not exist"
        );
        return stakes[_stakeId];
    }
}
