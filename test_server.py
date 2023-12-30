#!/bin/python3
import asyncio
from websockets.server import serve

async def echo(websocket):
    async for message in websocket:
        print(f"Received: {message}")
        await websocket.send(message)

async def main():
    port = 4567
    print(f"Starting server at: ws://localhost:{port}")
    async with serve(echo, "localhost", port):
        await asyncio.Future()  # run forever

asyncio.run(main())
