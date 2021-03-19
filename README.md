The internal 5900 port will need to remain the same because that is the configured port for the VNC server 
running inside the container.

Here is an example with the standalone images, the same concept applies to the node images.
``` bash
$ docker run -d -p 4444:4444 -p 5900:5900 -v /dev/shm:/dev/shm selenium/standalone-chrome:4.0.0-beta-2-20210317
$ docker run -d -p 4444:4444 -p 5900:5900 -v /dev/shm:/dev/shm selenium/standalone-edge:4.0.0-beta-2-20210317
$ docker run -d -p 4445:4444 -p 5901:5900 -v /dev/shm:/dev/shm selenium/standalone-firefox:4.0.0-beta-2-20210317
$ docker run -d -p 4446:4444 -p 5902:5900 -v /dev/shm:/dev/shm selenium/standalone-opera:4.0.0-beta-2-20210317
```

Then, you would use in your VNC client:
- Port 5900 to connect to the Chrome container
- Port 5901 to connect to the Firefox container
- Port 5902 to connect to the Opera container

In case you have [RealVNC](https://www.realvnc.com/) binary `vnc` in your path, you can always take a look, select view 
only to avoid messing around your tests with an unintended mouse click or keyboard interrupt:
``` bash
$ ./bin/vncview 127.0.0.1:5900
```

When you are prompted for the password it is `secret`. If you wish to change this then you should either change 
it in the `/NodeBase/Dockerfile` and build the images yourself, or you can define a Docker image that derives from 
the posted ones which reconfigures it:
``` dockerfile
#FROM selenium/node-chrome:4.0.0-beta-2-20210317
#FROM selenium/node-edge:4.0.0-beta-2-20210317
#FROM selenium/node-firefox:4.0.0-beta-2-20210317
#FROM selenium/node-opera:4.0.0-beta-2-20210317
#Choose the FROM statement that works for you.

RUN x11vnc -storepasswd <your-password-here> /home/seluser/.vnc/passwd
```

If you want to run VNC without password authentication you can set the environment variable `VNC_NO_PASSWORD=1`.

___