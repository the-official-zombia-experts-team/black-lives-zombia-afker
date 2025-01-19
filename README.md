# black lives zombia afker 24/7

this is basically just a fancy word for a single filler that's sent to a base that stays in the base 24/7 to afk for you.
just run this code on a vps that stays 24/7 and send the filler to your base and do not close the script and it will automatically afk for you (assuming it doesn't disconnect)

## how to use script

1. download nodejs. you can visit nodejs's website to install on windows and on gnu+linux it should already be installed by default. If it is not installed by default then you can run `sudo apt install node npm` or `sudo pacman -S node npm`. just install it on whatever package manager you use. If you are on windows then go to the nodejs site and run the installer from the site. If your antivirus flags it then just turn it off because node.js is safe.
2. clone this git repo to the computer
3. open up a command line and cd to the folder where you downloaded this to.
4. run `npm i bytebuffer readline-sync`. you don't need to install any other packages
5. run `node main.js baseserverid yourpsk` but of course replace baseserverid with the server id where the base is in and replace yourpsk with your party sharekey.
6. it will send an alt to your base. leave the script running on your vps
