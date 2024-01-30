import React from 'react'
import DashboardSkeleton from '../ui/skeletons'

// In next we can create a field in the route (folder) named loading, this component is for render something before to get the data, 
// If the data takes 3 sec to load, the component will not render any data until 3 sec, this component can show a skeleton or loading screen
// until the request data can be render 

const Loading = () => {
  return <DashboardSkeleton/>
}
export default Loading