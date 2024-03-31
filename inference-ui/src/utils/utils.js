const dataTypeMapping = {
  object: "Text",
  int64: "Integer 64bits",
  int32: "Integer 32bits",
  float64: "Float 64bits",
  float32: "Float 32bits",
  "datetime64[ns]": "Date",
  complex128: "Complex",
  bool: "Boolean",
  category: "Category",
};

const dataConversionMapping = {
  object: {
    int64: true,
    int32: true,
    float64: true,
    float32: true,
    "datetime64[ns]": true,
    complex128: true,
    bool: true,
    category: true,
    object: true,
  },
  int64: {
    object: true,
    int32: true,
    int64: true,
    float64: true,
    float32: true,
    "datetime64[ns]": true,
    complex128: true,
    bool: true,
    category: true,
  },
  int32: {
    object: true,
    int32: true,
    int64: true,
    float64: true,
    float32: true,
    "datetime64[ns]": true,
    complex128: true,
    bool: true,
    category: true,
  },
  float64: {
    object: true,
    int32: true,
    int64: true,
    float32: true,
    "datetime64[ns]": false,
    complex128: true,
    bool: true,
    category: true,
  },
  float32: {
    object: true,
    int32: true,
    float64: true,
    float32: true,
    "datetime64[ns]": false,
    complex128: true,
    bool: true,
    category: true,
  },
  "datetime64[ns]": {
    object: true,
    int32: true,
    float64: false,
    complex128: false,
    bool: false,
    "datetime64[ns]": true,
    category: true,
  },
  complex128: {
    object: true,
    int32: true,
    int64: true,
    float64: true,
    float32: true,
    "datetime64[ns]": false,
    complex128: true,
    bool: false,
    category: true,
  },
  bool: {
    object: true,
    int32: true,
    int64: true,
    float64: true,
    float32: true,
    "datetime64[ns]": false,
    complex128: false,
    bool: true,
    category: true,
  },
  category: {
    object: true,
    int32: true,
    int64: true,
    float64: true,
    float32: true,
    "datetime64[ns]": true,
    boolean: true,
    complex128: true,
    category: true,
  },
};

// Function to get user-friendly data type name
function getUserFriendlyDataType(backendDataType) {
  return dataTypeMapping[backendDataType] || backendDataType;
}

function getKey(target) {
  let type = "";
  for (const key in dataTypeMapping) {
    if (Object.hasOwnProperty.call(dataTypeMapping, key)) {
      if (dataTypeMapping[key] === target) {
        type = key;
        break;
      }
    }
  }
  return type;
}

export const Utils = {
  dataTypeMapping,
  dataConversionMapping,
  getUserFriendlyDataType,
  getKey,
};
