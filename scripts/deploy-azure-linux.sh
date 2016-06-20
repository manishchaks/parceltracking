if [ -z "$WM_SOURCE_LOCATION" ]; then
    echo "Need to set WM_SOURCE_LOCATION (full path). eg- /home/manish/Code/parceltracking"
    exit 1
fi

if [ -z "$WM_TOMCAT_LOCATION" ]; then
    echo "Need to set WM_TOMCAT_LOCATION.(full path) Eg- /home/manish/Code/apache-tomcat-8.0.36"
    exit 1
fi
SHUTDOWN_SCRIPT="$WM_TOMCAT_LOCATION/bin/shutdown.sh"
STARTUP_SCRIPT="$WM_TOMCAT_LOCATION/bin/startup.sh"
OLDPWD=`pwd`
WM_APP_NAME=`basename $WM_SOURCE_LOCATION`

echo "App name is $WM_APP_NAME"

echo "shutting down tomcat"
$SHUTDOWN_SCRIPT

echo "Building .WAR file"
cd $WM_SOURCE_LOCATION
git clean -fdx
git pull
mvn clean install
cd $WM_SOURCE_LOCATION/target

echo "deleting old app"
rm -rf $WM_TOMCAT_LOCATION/webapps/$WM_APP_NAME*
echo "Copying war file to Apache Tomcat"
cp -v `ls *.war` $WM_TOMCAT_LOCATION/webapps

echo "attempting to start Apache Tomcat."
$STARTUP_SCRIPT

echo "Changing back to old directory"
cd $OLDPWD
