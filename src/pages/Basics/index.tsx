import {
  LocalUser,
  RemoteUser,
  useIsConnected,
  useJoin,
  useLocalMicrophoneTrack,
  useLocalCameraTrack,
  usePublish,
  useRemoteUsers,
} from "agora-rtc-react";
import React, { useState } from "react";

import "./styles.css";
import { useGuard } from '@authing/guard-react18'

export const Basics = () => {
  const [calling, setCalling] = useState(false);
  const isConnected = useIsConnected(); // 存储用户的连接状态
  const [appId, setAppId] = useState(""); 
  const [channel, setChannel] = useState(""); 
  const [token, setToken] = useState("");

  useJoin({appid: appId, channel: channel, token: token ? token : null}, calling);
  //local user
  const [micOn, setMic] = useState(true);
  const [cameraOn, setCamera] = useState(true);
  const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
  const { localCameraTrack } = useLocalCameraTrack(cameraOn);
  usePublish([localMicrophoneTrack, localCameraTrack]);
  //remote users
  const remoteUsers = useRemoteUsers();
  
  const guard = useGuard()
  const onLogout = () => guard.logout()

  const onVerify = async () => {
    if (channel === 'app') {
      setAppId('b751b23b4f36458b97bfd00a6c304a7f')
      setToken('007eJxTYKjf2JVg5R97f3HWD9NFX1Zn6alky10wK3tbz2ytmMC44oMCQ5K5qWGSkXGSSZqxmYmpRZKleVJaioFBolmysYFJonmarDJnakMgI4Oo8BNmRgYIBPGZGRILChgYAMdXHII=')
    }

    setCalling(true)
  }

 

  return (
    <>
      <button className='authing-button' onClick={onLogout}>登出</button>
      <div className="room">
        {isConnected ? (
          <div className="user-list">
            <div className="user">
              <LocalUser
                audioTrack={localMicrophoneTrack}
                cameraOn={cameraOn}
                micOn={micOn}
                videoTrack={localCameraTrack}
                cover="https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg"
              >
                <div className="user-name">You</div>
              </LocalUser>
            </div>
            {remoteUsers.map((user) => (
              <div className="user" key={user.uid}>
                <RemoteUser cover="https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg" user={user}>
                  <samp className="user-name">{user.uid}</samp>
                </RemoteUser>
              </div>
            ))}
          </div>
        ) : (
          <div className="join-room">
            {/* <input
              onChange={e => setAppId(e.target.value)}
              placeholder="<Your app ID>"
              value={appId}
            />
            <input
              onChange={e => setChannel(e.target.value)}
              placeholder="<Your channel Name>"
              value={channel}
            />
            <input
              onChange={e => setToken(e.target.value)}
              placeholder="<Your token>"
              value={token}
            /> */}
            <div className="channelName">房间名称</div>
             <input
              onChange={e => setChannel(e.target.value)}
              placeholder="请输入会议房间"
              value={channel}
            />
            
            <button
              className={`join-channel ${!channel ? "disabled" : ""}`}
              disabled={!channel}
              onClick={() => onVerify()}
            >
              <span>加入会议</span>
            </button>
          </div>
        )}
      </div>
      {isConnected && (
        <div className="control">
          <div className="left-control">
            <button className="btn" onClick={() => setMic(a => !a)}>
              <i className={`i-microphone ${!micOn ? "off" : ""}`} />
            </button>
            <button className="btn" onClick={() => setCamera(a => !a)}>
              <i className={`i-camera ${!cameraOn ? "off" : ""}`} />
            </button>
          </div>
          <button
            className={`btn btn-phone ${calling ? "btn-phone-active" : ""}`}
            onClick={() => setCalling(a => !a)}
          >
            {calling ? <i className="i-phone-hangup" /> : <i className="i-mdi-phone" />}
          </button>
        </div>
      )}
    </>
  );
};

export default Basics;