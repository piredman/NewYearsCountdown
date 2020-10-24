# Remove Apps
heroku pipelines:remove -a newyears-countdown
heroku apps:destroy --app newyears-countdown --confirm newyears-countdown

# Create Apps
heroku apps:create --remote heroku-web newyears-countdown

# Add Apps to Pipeline
heroku pipelines:add newyears-countdown -a