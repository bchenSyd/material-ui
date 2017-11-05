
# selenium test 
## local end to end
### Download Selenium
1. Download the latest version of the selenium-server-standalone-{VERSION}.jar file from the Selenium downloads page 
and place it on the computer with the browser you want to test.   

2. In most cases this will be on your local machine and typically inside your project's source folder.
A good practice is to create a separate subfolder (e.g. bin) and place it there as you might have to download other driver binaries 
if you want to test multiple browsers.

### Running Selenium Automatically
If the server is on the same machine where Nightwatch is running, it can be started/stopped directly by the Nightwatch Test Runner.

### Running Selenium Manually
To run the Selenium Server manually, from the directory with the jar run the following:
```
$ java -jar selenium-server-standalone-{VERSION}.jar
```
## remote end to end test
### hub.browserstack.com has selenium server running already

  selenium: {
    start_process: false,
    host: 'hub.browserstack.com',
    port: 80,
  },

  //it also provides some browser configurations
  chrome_51: {
      desiredCapabilities: {
        browserName: 'Chrome',
        browser_version: '51.0',
        os: 'OS X',
        os_version: 'El Capitan',
        chromeOptions: {
          args: ['--start-maximized'],
        },
      },
    }


### https://ngrok.com/ makes your localhost:8000 accessible from browserstack
ngrok:”I want to expose a local server behind a NAT or firewall to the internet.”
https://ngrok.com/
