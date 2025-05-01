import React, { useState } from "react";
import "./ModbusRtu.css";

const ModbusRtu = () => {
  const [address, setAddress] = useState("01");
  const [functionCode, setFunctionCode] = useState("03");
  const [messageType, setMessageType] = useState("request");
  const [dataFields, setDataFields] = useState({});
  const [result, setResult] = useState("");

  // Configuration des champs pour chaque fonction et type de message
  const functionConfigs = {
    "01": {
      name: "Read Coils",
      description: "Read multiple output bits",
      request: [
        {
          name: "startingAddress",
          label: "Starting Address",
          type: "hex",
          size: 2,
          valueDesc: "0x0000 to 0xFFFF",
        },
        {
          name: "quantityOfBits",
          label: "Quantity of bits",
          type: "hex",
          size: 2,
          valueDesc: "1 to 2000 (0x07D0)",
        },
      ],
      response: [
        {
          name: "byteCount",
          label: "Byte count",
          type: "hex",
          size: 1,
          valueDesc: "N (Quantity of bits / 8, rounded up)",
        },
        {
          name: "coilsStatus",
          label: "Coils status",
          type: "hex",
          size: null,
          valueDesc: "N bytes",
        },
      ],
    },
    "02": {
      name: "Read Discrete Inputs",
      description: "Read multiple input bits",
      request: [
        {
          name: "startingAddress",
          label: "Starting Address",
          type: "hex",
          size: 2,
          valueDesc: "0x0000 to 0xFFFF",
        },
        {
          name: "quantityOfInputs",
          label: "Quantity of inputs",
          type: "hex",
          size: 2,
          valueDesc: "1 to 2000 (0x07D0)",
        },
      ],
      response: [
        {
          name: "byteCount",
          label: "Byte count",
          type: "hex",
          size: 1,
          valueDesc: "N (Quantity of inputs / 8, rounded up)",
        },
        {
          name: "inputsStatus",
          label: "Inputs status",
          type: "hex",
          size: null,
          valueDesc: "N bytes",
        },
      ],
    },
    "03": {
      name: "Read Holding Registers",
      description: "Read output registers",
      request: [
        {
          name: "startingAddress",
          label: "Starting Address",
          type: "hex",
          size: 2,
          valueDesc: "0x0000 to 0xFFFF",
        },
        {
          name: "quantityOfRegisters",
          label: "Quantity of registers",
          type: "hex",
          size: 2,
          valueDesc: "1 to 125 (0x7D)",
        },
      ],
      response: [
        {
          name: "byteCount",
          label: "Byte count",
          type: "hex",
          size: 1,
          valueDesc: "2 × N",
        },
        {
          name: "registersValues",
          label: "Register values",
          type: "hex",
          size: null,
          valueDesc: "N × 2 bytes",
        },
      ],
    },
    "04": {
      name: "Read Input Registers",
      description: "Read input registers",
      request: [
        {
          name: "startingAddress",
          label: "Starting Address",
          type: "hex",
          size: 2,
          valueDesc: "0x0000 to 0xFFFF",
        },
        {
          name: "quantityOfRegisters",
          label: "Quantity of registers",
          type: "hex",
          size: 2,
          valueDesc: "1 to 125 (0x7D)",
        },
      ],
      response: [
        {
          name: "byteCount",
          label: "Byte count",
          type: "hex",
          size: 1,
          valueDesc: "2 × N",
        },
        {
          name: "registersValues",
          label: "Register values",
          type: "hex",
          size: null,
          valueDesc: "N × 2 bytes",
        },
      ],
    },
    "05": {
      name: "Write Single Coil",
      description: "Write single output bit",
      request: [
        {
          name: "outputAddress",
          label: "Output Address",
          type: "hex",
          size: 2,
          valueDesc: "0x0000 to 0xFFFF",
        },
        {
          name: "outputValue",
          label: "Output value",
          type: "hex",
          size: 2,
          valueDesc: "0x0000 (OFF) or 0xFF00 (ON)",
        },
      ],
      response: [
        {
          name: "outputAddress",
          label: "Output Address",
          type: "hex",
          size: 2,
          valueDesc: "0x0000 to 0xFFFF",
        },
        {
          name: "outputValue",
          label: "Output value",
          type: "hex",
          size: 2,
          valueDesc: "0x0000 (OFF) or 0xFF00 (ON)",
        },
      ],
    },
    "06": {
      name: "Write Single Register",
      description: "Write single output register",
      request: [
        {
          name: "registerAddress",
          label: "Register Address",
          type: "hex",
          size: 2,
          valueDesc: "0x0000 to 0xFFFF",
        },
        {
          name: "registerValue",
          label: "Register value",
          type: "hex",
          size: 2,
          valueDesc: "0x0000 to 0xFFFF",
        },
      ],
      response: [
        {
          name: "registerAddress",
          label: "Register Address",
          type: "hex",
          size: 2,
          valueDesc: "0x0000 to 0xFFFF",
        },
        {
          name: "registerValue",
          label: "Register value",
          type: "hex",
          size: 2,
          valueDesc: "0x0000 to 0xFFFF",
        },
      ],
    },
    "0F": {
      name: "Write Multiple Coils",
      description: "Write multiple output bits",
      request: [
        {
          name: "startingAddress",
          label: "Starting Address",
          type: "hex",
          size: 2,
          valueDesc: "0x0000 to 0xFFFF",
        },
        {
          name: "quantityOfOutputs",
          label: "Quantity of outputs",
          type: "hex",
          size: 2,
          valueDesc: "1 to 1968 (0x07B0)",
        },
        {
          name: "byteCount",
          label: "Byte count",
          type: "hex",
          size: 1,
          valueDesc: "N (Quantity of outputs / 8, rounded up)",
        },
        {
          name: "outputsValue",
          label: "Outputs value",
          type: "hex",
          size: null,
          valueDesc: "N bytes",
        },
      ],
      response: [
        {
          name: "startingAddress",
          label: "Starting Address",
          type: "hex",
          size: 2,
          valueDesc: "0x0000 to 0xFFFF",
        },
        {
          name: "quantityOfOutputs",
          label: "Quantity of outputs",
          type: "hex",
          size: 2,
          valueDesc: "1 to 1968 (0x07B0)",
        },
      ],
    },
    10: {
      name: "Write Multiple Registers",
      description: "Write multiple output registers",
      request: [
        {
          name: "startingAddress",
          label: "Starting Address",
          type: "hex",
          size: 2,
          valueDesc: "0x0000 to 0xFFFF",
        },
        {
          name: "quantityOfRegisters",
          label: "Quantity of registers",
          type: "hex",
          size: 2,
          valueDesc: "1 to 123 (0x7B)",
        },
        {
          name: "byteCount",
          label: "Byte count",
          type: "hex",
          size: 1,
          valueDesc: "2 × N",
        },
        {
          name: "registersValue",
          label: "Registers value",
          type: "hex",
          size: null,
          valueDesc: "N × 2 bytes",
        },
      ],
      response: [
        {
          name: "startingAddress",
          label: "Starting Address",
          type: "hex",
          size: 2,
          valueDesc: "0x0000 to 0xFFFF",
        },
        {
          name: "quantityOfRegisters",
          label: "Quantity of registers",
          type: "hex",
          size: 2,
          valueDesc: "1 to 123 (0x7B)",
        },
      ],
    },
  };

  // Gestion du changement des champs de données
  const handleDataFieldChange = (fieldName, value) => {
    setDataFields({
      ...dataFields,
      [fieldName]: value.replace(/[^0-9a-fA-F]/g, ""),
    });
  };

  // Calcul du CRC16
  const calculateCRC = (hexString) => {
    let crc = 0xffff;
    let odd;

    for (let i = 0; i < hexString.length; i += 2) {
      let byte = parseInt(hexString.substr(i, 2), 16);
      crc ^= byte;

      for (let j = 0; j < 8; j++) {
        odd = crc & 0x0001;
        crc >>= 1;
        if (odd) crc ^= 0xa001;
      }
    }

    return (
      (crc & 0xff).toString(16).padStart(2, "0") +
      ((crc >> 8) & 0xff).toString(16).padStart(2, "0")
    ).toUpperCase();
  };

  const generateFrame = () => {
    let data = "";
    const config = functionConfigs[functionCode][messageType];

    config.forEach((field) => {
      if (dataFields[field.name]) {
        const value = dataFields[field.name];
        data += field.size ? value.padStart(field.size * 2, "0") : value;
      }
    });

    const frameWithoutCRC = address + functionCode + data;
    const crc = calculateCRC(frameWithoutCRC);
    const fullFrame = `[Silence] ${frameWithoutCRC} ${crc} [Silence]`;

    setResult(fullFrame);
  };

  const selectedFunction =
    functionConfigs[functionCode] || functionConfigs["03"];

  return (
    <div className="modbus-rtu-container">
      <div className="modbus-header">
        <div className="modbus-intro">
          <h2>MODBUS RTU PROTOCOL</h2>
          <p>
            MODBUS RTU is a serial communication protocol that uses binary
            representation of data for efficient transmission. It's widely used
            in industrial automation systems for communication between
            electronic devices.
          </p>
          <p>
            This tool helps you generate valid MODBUS RTU frames with proper CRC
            calculation for testing and development purposes.
          </p>
        </div>
      </div>
      <div className="frame-structure">
        <h3>MODBUS RTU Frame Structure</h3>
        <table className="frame-table">
          <thead>
            <tr>
              <th>Start</th>
              <th>Slave Address</th>
              <th>Function Code</th>
              <th>Data</th>
              <th>CRC</th>
              <th>End</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Silence</td>
              <td>1 Byte</td>
              <td>1 Byte</td>
              <td>n Bytes</td>
              <td>2 Bytes</td>
              <td>Silence</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="input-section">
        <div className="input-group">
        <h3>MODBUS Protocol Frame Builder</h3>
          <label>Message Type:</label>
          <div className="toggle-buttons">
            <button
              className={messageType === "request" ? "active" : ""}
              onClick={() => setMessageType("request")}
            >
              Request
            </button>
            <button
              className={messageType === "response" ? "active" : ""}
              onClick={() => setMessageType("response")}
            >
              Response
            </button>
          </div>
        </div>

        <div className="input-group">
          <label>Slave Address (hex):</label>
          <input
            type="text"
            value={address}
            onChange={(e) =>
              setAddress(e.target.value.replace(/[^0-9a-fA-F]/g, ""))
            }
            maxLength="2"
          />
        </div>

        <div className="input-group">
          <label>Function Code:</label>
          <select
            value={functionCode}
            onChange={(e) => {
              setFunctionCode(e.target.value);
              setDataFields({});
            }}
          >
            {Object.entries(functionConfigs).map(([code, func]) => (
              <option key={code} value={code}>
                0x{code.padStart(2, "0")} - {func.name} ({func.description})
              </option>
            ))}
          </select>
        </div>

        {selectedFunction[messageType]?.map((field, index) => (
          <div className="input-group" key={index}>
            <label>
              {field.label} ({field.size ? `${field.size} bytes` : "variable"}):
            </label>
            <input
              type="text"
              value={dataFields[field.name] || ""}
              onChange={(e) =>
                handleDataFieldChange(field.name, e.target.value)
              }
              maxLength={field.size ? field.size * 2 : undefined}
              placeholder={`Hex (${
                field.size ? field.size * 2 : "variable"
              } chars)`}
            />
          </div>
        ))}

<button className="generate-button" onClick={generateFrame}>
          Generate MODBUS RTU Frame
        </button>
      </div>

      {result && (
        <div className="result">
          <h3>Generated MODBUS RTU Frame:</h3>
          <div className="frame-display">
            <div className="frame-part silence">[Silence]</div>
            <div className="frame-part address">{address}</div>
            <div className="frame-part function">{functionCode}</div>
            {selectedFunction[messageType]?.map(
              (field, index) =>
                dataFields[field.name] && (
                  <div className="frame-part data" key={index}>
                    {dataFields[field.name].padStart(
                      field.size ? field.size * 2 : 0,
                      "0"
                    )}
                  </div>
                )
            )}
            <div className="frame-part crc">
              {calculateCRC(
                address + functionCode + Object.values(dataFields).join("")
              )}
            </div>
            <div className="frame-part silence">[Silence]</div>
          </div>
          <div className="hex-display">
            <p>Complete hexadecimal format:</p>
            <code>{result}</code>
          </div>
        </div>
      )}

      <div className="function-details">
        <h3>
          Function 0x{functionCode.padStart(2, "0")} Details -{" "}
          {selectedFunction.description}
        </h3>
        <p>{selectedFunction.description}</p>

        <div className="request-response">
          <div className="request">
            <h4>Request:</h4>
            <table>
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Size in bytes</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Function code</td>
                  <td>1</td>
                  <td>0x{functionCode.padStart(2, "0")}</td>
                </tr>
                {selectedFunction.request?.map((field, index) => (
                  <tr key={`req-${index}`}>
                    <td>{field.label}</td>
                    {field.size != null ? (
                      <>
                        <td>{field.size}</td>
                        <td>{field.valueDesc}</td>
                      </>
                    ) : (
                      <>
                        <td>{field.valueDesc}</td>
                        <td>{field.size}</td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="response">
            <h4>Response:</h4>
            <table>
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Size in bytes</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Function code</td>
                  <td>1</td>
                  <td>0x{functionCode.padStart(2, "0")}</td>
                </tr>
                {selectedFunction.response?.map((field, index) => (
                  <tr key={`res-${index}`}>
                    <td>{field.label}</td>
                    {field.size != null ? (
                      <>
                        <td>{field.size}</td>
                        <td>{field.valueDesc}</td>
                      </>
                    ) : (
                      <>
                        <td>{field.valueDesc}</td>
                        <td>{field.size}</td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModbusRtu;
