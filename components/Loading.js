import React from 'react'
import { ActivityIndicator, SafeAreaView, Text } from 'react-native'

/**
 * This component will use an activity indicator to suggest the screen is loading
 * @returns 
 */

const Loading = () => {
  return (
    <SafeAreaView className="justify-center items-center">
      <ActivityIndicator size="large" color="0000ff"/>
      <Text className="text-center">Loading...</Text>
    </SafeAreaView>
  )
}

export default Loading