import React, {useEffect, useState} from 'react'
import { SafeAreaView, View, Text, StyleSheet } from 'react-native'
import Loading from '../../components/Loading';
/**
 * This Screen is used to display basic information about a player such as their age and nationality. 
 * @param {} PlayerInfo 
 * @returns UI
 */

const PlayerInfo = ({PlayerInfo}) => {
    const [player, setPlayer] = useState('');
    const [loading, setLoading] = useState(true);
    
    /**
     * update UI after render. 
     * check Player Info 
     */
    useEffect(() => {
        /**
         * this function is used to set the state of Player. 
         */
      const fetchPlayerFromNav = () => {
        try {
            setPlayer(PlayerInfo);
            setLoading(false);
        } catch (error) {
            console.log(error) // display error
        }
      }
        fetchPlayerFromNav(); // call method
    }, [PlayerInfo]) // end use effect

    if(loading){ // check if loading
        return(
            <Loading/>
        )
    }
    // display UI 
  return (
    <SafeAreaView style={{flex:0, marginTop: 5, alignItems: 'center'}}> 
        { player && 
    <View>
        <View>
            <View className="flex-row gap-5">
            <Text style={styles.txt}>Nationality:</Text>
            <Text style={styles.txt}>{player.player.nationality}</Text>
            </View>
            <View className="flex-row gap-5">
            <Text style={styles.txt}>Age:</Text>
            <Text style={styles.txt}>{player.player.age}</Text>
            </View>
        </View>
        
    </View>
    }      
    </SafeAreaView>
  )

  
}

/**
 * Create styles 
 */
const styles = StyleSheet.create({
    row:{
        flexDirection: 'row',
        gap: 20,
    },

    txt:{

        fontSize: 18
    },
    txtData:{
        fontSize: 20,
        fontWeight: '600',
    }

  })

export default PlayerInfo