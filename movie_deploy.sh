echo "===========进入git项目movie目录============="
cd /developer/git-repository/movie


echo "==========git切换分之到master==============="
git checkout master

echo "==================git fetch======================"
git fetch

echo "==================git pull======================"
git pull


echo "===========Install packages===================="
npm install --production
