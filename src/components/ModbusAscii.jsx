import React, { useState } from "react";
import "./ModbusAscii.css";

const ModbusAscii = () => {
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

  // Calcul du LRC (Longitudinal Redundancy Check) pour Modbus ASCII
  const calculateLRC = (hexString) => {
    let lrc = 0;
    for (let i = 0; i < hexString.length; i += 2) {
      const byte = parseInt(hexString.substr(i, 2), 16); // <-- Remove the comma
      lrc = (lrc + byte) & 0xff;
    }
    lrc = ((lrc ^ 0xff) + 1) & 0xff;
    return lrc.toString(16).padStart(2, "0").toUpperCase();
  };

  // Convert hex string to ASCII representation
  const hexToAscii = (hexString) => {
    let ascii = "";
    for (let i = 0; i < hexString.length; i += 2) {
      const hex = hexString.substr(i, 2);
      ascii += String.fromCharCode(parseInt(hex, 16));
    }
    return ascii;
  };

  const generateFrame = () => {
    let data = "";
    const config = functionConfigs[functionCode][messageType];

    // Build the data portion
    config.forEach((field) => {
      if (dataFields[field.name]) {
        const value = dataFields[field.name];
        data += field.size ? value.padStart(field.size * 2, "0") : value;
      }
    });

    // Create the frame without LRC
    const frameWithoutLRC = address + functionCode + data;

    // Calculate LRC (including address, function code and data)
    const lrc = calculateLRC(frameWithoutLRC);

    // Convert to ASCII format
    const asciiFrame = `:${frameWithoutLRC}${lrc}\\r\\n`;

    setResult(asciiFrame);
  };

  const selectedFunction =
    functionConfigs[functionCode] || functionConfigs["03"];

  return (
    <div className="modbus-ascii-container">
      <div className="modbus-header">
        <div className="modbus-intro">
          <h2>MODBUS ASCII PROTOCOL</h2>
          <p>
            MODBUS ASCII is a serial communication protocol that uses ASCII
            characters to represent hexadecimal values. It's less efficient than
            RTU but more human-readable and easier to debug.
          </p>
          <p>
            This tool helps you generate valid MODBUS ASCII frames with proper
            LRC calculation for testing and development purposes.
          </p>
        </div>
      </div>
      <div className="frame-structure">
        <h3>MODBUS ASCII Frame Structure</h3>
        <table className="frame-table">
          <thead>
            <tr>
              <th>Start</th>
              <th>Slave Address</th>
              <th>Function Code</th>
              <th>Data</th>
              <th>LRC</th>
              <th>End</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>:</td>
              <td>2 ASCII chars</td>
              <td>2 ASCII chars</td>
              <td>n ASCII chars</td>
              <td>2 ASCII chars</td>
              <td>CR LF</td>
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
          Generate MODBUS ASCII Frame
        </button>
      </div>

      {result && (
        <div className="result">
          <h3>Generated MODBUS ASCII Frame:</h3>
          <div className="frame-display">
            <div className="frame-part start">:</div>
            <div className="frame-part address">{address}</div>
            <div className="frame-part function">{functionCode}</div>
            {selectedFunction[messageType]?.map((field, index) => {
              const value = dataFields[field.name] || "";
              const paddedValue = field.size
                ? value.padStart(field.size * 2, "0")
                : value;
              return (
                <div className="frame-part data" key={index}>
                  {paddedValue}
                </div>
              );
            })}
            <div className="frame-part lrc">
              {calculateLRC(
                address +
                  functionCode +
                  selectedFunction[messageType]
                    .map((field) => dataFields[field.name] || "")
                    .join("")
              )}
            </div>
            <div className="frame-part end">CR LF</div>
          </div>
          <div className="ascii-display">
            <p>Complete ASCII format:</p>
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

export default ModbusAscii;
