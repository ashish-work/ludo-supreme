#!/bin/bash
declare -a simulators=("F3E3032C-3DAC-4E4C-A8C9-502B81D47BFD" "47B9BE95-A4D0-4B2B-90E3-B5763C0722B9")

echo "STARTED"
open -a Simulator
wait_time=1
for i in "${simulators[@]}"
do
    echo "Boot $i"
    xcrun simctl boot $i
    sleep $wait_time
    echo "Install Expo $i"
    xcrun simctl install $i ~/.expo/ios-simulator-app-cache/Exponent-2.28.9.tar.app
    sleep $wait_time
    echo "Lauch Expo $i"
    xcrun simctl openurl $i exp://127.0.0.1:19000
    sleep $wait_time
done
echo "FINISHED"
