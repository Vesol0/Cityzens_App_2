import React from 'react'
import { SafeAreaView, Text, View, ScrollView, FlatList} from 'react-native'
import EmbedTweet from './EmbedTweet'

/*

  ***  Newsfeed Screen  ***

  This screen provides the user to view tweets from a Man City twitter account which provides updates via twitter. 


*/



export default function Newsfeed() {

  /* 
    Hard coded Tweet Id's due to Twitter API requiring developer access. 
  */
  const tweetIds = [
    '1793032053132329201',
    '1792967581097181651',
    '1792933514448371724'
    
  ];
  return (
    // returns a List view of all the tweets mentioned in tweetids.
    <View>
        <SafeAreaView style={{ flex: 0 }}>
        <FlatList
          data={tweetIds}
          keyExtractor={(item) => item}
          renderItem={({item}) => <EmbedTweet tweetId={item} />}
        />
    </SafeAreaView>
    </View>
  )
}
