import { Avatar, Button, Chip, CircularProgress } from "@mui/material";
import TextField from "@mui/material/TextField";
import axios from "axios";
import React, { useState } from "react";

function InstagramAutoComplete() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const [textValue, setTextValue] = useState(null);

  const onTextChange = (e) => setTextValue(e.target.value);
  const handleReset = () => {
    setUser(null);
    setTextValue("");
  };

  const searchByUserName = async () => {
    if (textValue) {
      setLoading(true);
      await axios
        .get(`http://localhost:3000/api/instagram?username=${textValue}`)
        .then(async ({ data }) => {
          setUser(data);
          setLoading(false);
        })
        .catch((e) => {
          setUser(null);
          setLoading(false);
        });
    }
  };

  return (
    <div style={{ marginTop: 15, padding: 16, margin: "auto", maxWidth: 600 }}>
      <div style={{ textAlign: "center" }}>
        {loading && <CircularProgress color="secondary" />}
      </div>
      <div style={{ display: "flex" }}>
        <TextField
          onChange={onTextChange}
          value={textValue}
          label={"username"}
          style={{ marginRight: "5px" }}
        />
        <Button
          variant="outlined"
          onClick={searchByUserName}
          disabled={loading}
        >
          Submit
        </Button>
      </div>

      {user && (
        <Chip
          style={{ marginTop: "5px" }}
          avatar={<Avatar src={`http://localhost:3000/${user.filename}`} />}
          label={user.full_name}
          variant="outlined"
          onDelete={handleReset}
        />
      )}
    </div>
  );
}

export default InstagramAutoComplete;
