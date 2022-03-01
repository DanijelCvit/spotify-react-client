import React, { useState, useEffect, useRef } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import FastForwardRounded from "@mui/icons-material/FastForwardRounded";
import FastRewindRounded from "@mui/icons-material/FastRewindRounded";
import VolumeUpRounded from "@mui/icons-material/VolumeUpRounded";
import VolumeDownRounded from "@mui/icons-material/VolumeDownRounded";
import ConnectedDevices from "./ConnectedDevices";
import { BASE_API_URL } from "../constants.js";

const Widget = styled(Stack)(({ theme }) => ({
  maxWidth: "100%",
  margin: "auto",
  position: "relative",
  zIndex: 1,
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.6)",
  backdropFilter: "blur(40px)",
}));

const CoverImage = styled("div")({
  width: 100,
  height: 100,
  objectFit: "cover",
  overflow: "hidden",
  flexShrink: 0,
  borderRadius: 8,
  backgroundColor: "rgba(0,0,0,0.08)",
  "& > img": {
    width: "100%",
  },
});

const TinyText = styled(Typography)({
  fontSize: "0.75rem",
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});

const WebPlayback = ({ token, setCurrentTrack, current_track }) => {
  const theme = useTheme();

  // Format time from ms to min:sec
  function formatDuration(value) {
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute}:${secondLeft <= 9 ? `0${secondLeft}` : secondLeft}`;
  }
  const mainIconColor = theme.palette.mode === "dark" ? "#fff" : "#000";
  const lightIconColor =
    theme.palette.mode === "dark" ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)";

  const [player, setPlayer] = useState(undefined);
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [volume, setVolume] = useState(30);
  const [position, setPosition] = useState(0);
  const [selectedDevice, setSelectedDevice] = useState(null);

  const duration = Math.floor(current_track.duration_ms / 1000); // seconds

  // Keep new token value to pass to the player (auto requests new token after 1h)
  const newToken = useRef();
  newToken.current = token;

  const handleVolume = (_, newValue) => {
    player.setVolume(newValue / 100);
    setVolume(newValue);
  };

  // Update position of the current track
  const handleSeek = (_, newValue) => {
    player.seek(newValue * 1000);
  };

  useEffect(() => {
    if (!is_active || is_paused) {
      return;
    }
    const timeout = setTimeout(() => {
      setPosition(position + 1);
    }, 1000);

    console.log("starting timeout", timeout);

    return () => {
      console.log("stopping timeout", timeout);
      clearTimeout(timeout);
    };
  }, [is_paused, is_active, position]);

  useEffect(() => {
    if (!selectedDevice) {
      return;
    }

    const setActiveDevice = async () => {
      try {
        const res = await fetch(`${BASE_API_URL}/me/player`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ device_ids: [selectedDevice], play: true }),
        });
      } catch (error) {
        console.log(error);
      }
    };

    setActiveDevice();
  }, [selectedDevice]);

  // Add the SDK to the DOM and initialize the player
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "DC Web Player",
        getOAuthToken: (cb) => {
          cb(newToken.current);
        },
        volume: volume / 100,
      });

      setPlayer(player);

      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
        setSelectedDevice(device_id);
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      player.addListener("player_state_changed", (state) => {
        if (!state) {
          return;
        }

        setCurrentTrack(state.track_window.current_track);
        setPosition(parseInt(state.position / 1000));
        setPaused(state.paused);

        player.getCurrentState().then((state) => {
          !state ? setActive(false) : setActive(true);
        });
      });

      player.addListener("initialization_error", ({ message }) => {
        console.error(message);
      });

      player.addListener("authentication_error", ({ message }) => {
        console.error(message);
      });

      player.addListener("account_error", ({ message }) => {
        console.error(message);
      });

      player.connect();
    };

    return () => {
      if (player) {
        player.disconnect();
      }
    };
  }, []);

  return (
    <Widget
      direction={{ xs: "column", md: "row" }}
      sx={{
        justifyContent: "space-between",
        px: { xs: 2 },
      }}
      alignItems="center"
    >
      <Box
        sx={{
          display: { md: "flex" },
          textAlign: { xs: "center", md: "left" },
          alignItems: "center",
          width: { xs: "100%", sm: "240px" },
          mr: { md: 2 },
          py: 1,
        }}
      >
        {current_track.album.images[0].url && (
          <CoverImage sx={{ margin: "auto" }}>
            <img
              alt="can't win - Chilling Sunday"
              src={current_track.album.images[0].url}
            />
          </CoverImage>
        )}
        <Box sx={{ ml: { md: 1.5 }, minWidth: 0 }}>
          <Typography variant="caption" color="text.secondary" fontWeight={500}>
            {current_track.artists[0].name}
          </Typography>
          <Typography noWrap>
            <b>{current_track.name}</b>
          </Typography>
        </Box>
      </Box>
      <Box sx={{ width: { xs: "100%" }, maxWidth: { md: "500px" } }}>
        <Slider
          aria-label="time-indicator"
          size="small"
          value={position}
          min={0}
          step={1}
          max={duration}
          onChange={handleSeek}
          sx={{
            color: theme.palette.mode === "dark" ? "#fff" : "rgba(0,0,0,0.87)",
            height: 4,
            "& .MuiSlider-thumb": {
              width: 8,
              height: 8,
              transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
              "&:before": {
                boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
              },
              "&:hover, &.Mui-focusVisible": {
                boxShadow: `0px 0px 0px 8px ${
                  theme.palette.mode === "dark"
                    ? "rgb(255 255 255 / 16%)"
                    : "rgb(0 0 0 / 16%)"
                }`,
              },
              "&.Mui-active": {
                width: 20,
                height: 20,
              },
            },
            "& .MuiSlider-rail": {
              opacity: 0.28,
            },
          }}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: -2,
          }}
        >
          <TinyText>{formatDuration(position)}</TinyText>
          <TinyText>{formatDuration(duration)}</TinyText>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            mt: -1,
          }}
        >
          <IconButton
            onClick={() => player.previousTrack()}
            aria-label="previous song"
          >
            <FastRewindRounded fontSize="large" htmlColor={mainIconColor} />
          </IconButton>
          <IconButton
            onClick={() => player.togglePlay()}
            aria-label={is_paused ? "play" : "pause"}
          >
            {is_paused ? (
              <PlayArrowRounded
                sx={{ fontSize: "3rem" }}
                htmlColor={mainIconColor}
              />
            ) : (
              <PauseRounded
                sx={{ fontSize: "3rem" }}
                htmlColor={mainIconColor}
              />
            )}
          </IconButton>
          <IconButton onClick={() => player.nextTrack()} aria-label="next song">
            <FastForwardRounded fontSize="large" htmlColor={mainIconColor} />
          </IconButton>
          <ConnectedDevices
            selectedDevice={selectedDevice}
            setSelectedDevice={setSelectedDevice}
          />
        </Box>
      </Box>
      <Stack
        spacing={1}
        direction="row"
        sx={{ mb: 1, px: 1, width: { xs: "100%", sm: "240px" } }}
        alignItems="center"
      >
        <VolumeDownRounded htmlColor={lightIconColor} />
        <Slider
          aria-label="Volume"
          value={volume}
          onChange={handleVolume}
          sx={{
            color: theme.palette.mode === "dark" ? "#fff" : "rgba(0,0,0,0.87)",
            "& .MuiSlider-track": {
              border: "none",
            },
            "& .MuiSlider-thumb": {
              width: 24,
              height: 24,
              backgroundColor: "#fff",
              "&:before": {
                boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
              },
              "&:hover, &.Mui-focusVisible, &.Mui-active": {
                boxShadow: "none",
              },
            },
          }}
        />
        <VolumeUpRounded htmlColor={lightIconColor} />
      </Stack>
    </Widget>
  );
};

export default WebPlayback;
