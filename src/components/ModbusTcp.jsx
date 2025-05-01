import React, { useState } from "react";

const ModbusTcp = () => {
  const [transactionId, setTransactionId] = useState("0001");
  const [protocolId, setProtocolId] = useState("0000");
  const [length, setLength] = useState("0006");
  const [address, setAddress] = useState("01");
  const [functionCode, setFunctionCode] = useState("03");
  const [data, setData] = useState("00010001");
  const [result, setResult] = useState("");

  // Calcul du CRC16 (identique à MODBUS RTU, mais généralement pas utilisé en TCP)
  // Inclus ici pour complétude, bien que le protocole TCP n'utilise normalement pas de CRC
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
    // Construction de l'en-tête MBAP
    const mbapHeader = transactionId + protocolId + length + address;

    // Construction de la PDU
    const pdu = functionCode + data;

    // Construction de la trame complète
    const fullFrame = mbapHeader + pdu;

    setResult(fullFrame);
  };

  return (
    <div className="modbus-container">
      <h2>MODBUS TCP/IP</h2>
      <img
        src="https://www.prosoft-technology.com/kb/assets/introduction-to-modbus/introduction-to-modbus-serial-line-protocols/modbus-tcp-protocol.png"
        alt="MODBUS TCP Protocol"
        className="protocol-image"
      />

      <div className="input-group">
        <label>ID de transaction (hex):</label>
        <input
          type="text"
          value={transactionId}
          onChange={(e) =>
            setTransactionId(e.target.value.replace(/[^0-9a-fA-F]/g, ""))
          }
          maxLength="4"
        />
      </div>

      <div className="input-group">
        <label>ID de protocole (hex, 0000 pour MODBUS):</label>
        <input
          type="text"
          value={protocolId}
          onChange={(e) =>
            setProtocolId(e.target.value.replace(/[^0-9a-fA-F]/g, ""))
          }
          maxLength="4"
        />
      </div>

      <div className="input-group">
        <label>Longueur (hex):</label>
        <input
          type="text"
          value={length}
          onChange={(e) =>
            setLength(e.target.value.replace(/[^0-9a-fA-F]/g, ""))
          }
          maxLength="4"
        />
      </div>

      <div className="input-group">
        <label>Adresse de l'esclave (hex):</label>
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
        <label>Code fonction (hex):</label>
        <input
          type="text"
          value={functionCode}
          onChange={(e) =>
            setFunctionCode(e.target.value.replace(/[^0-9a-fA-F]/g, ""))
          }
          maxLength="2"
        />
      </div>

      <div className="input-group">
        <label>Données (hex):</label>
        <input
          type="text"
          value={data}
          onChange={(e) => setData(e.target.value.replace(/[^0-9a-fA-F]/g, ""))}
        />
      </div>

      <button onClick={generateFrame}>Générer la trame</button>

      {result && (
        <div className="result">
          <h3>Trame MODBUS TCP/IP:</h3>
          <p>{result.match(/.{1,2}/g).join(" ")}</p>
          <p>Longueur: {result.length / 2} octets</p>
          <p>CRC (optionnel): {calculateCRC(address + functionCode + data)}</p>
        </div>
      )}
    </div>
  );
};

export default ModbusTcp;
