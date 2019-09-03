# Learning React with Redux

This is a simple project to learn React with Redux. It consists in a Streaming Web Service to manage and watch streams.

As persistence I used json-server (npm package), a full fake REST API managed in a single file - db.json.

To stream the video I use OBS (Open Broadcaster Software - Free and open source software for video recording and live streaming) to capture my web cam video and sent it to the RTMP Server.
The RTMP Server is provided by node-media-server (npm package), a Node.js implementation of RTMP/HTTP-FLV/WS-FLV/HLS/DASH Media Server.

I integrated Google OAuth2 for user login to creation/edition stream management.