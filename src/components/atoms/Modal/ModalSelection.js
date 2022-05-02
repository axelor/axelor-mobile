import { View, Text,StyleSheet,Dimensions } from 'react-native'
import React from 'react'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

const ModalSelection = ({style,options,setModalVisible}) => {

    const HEIGHT = Dimensions.get('window').height;
    const WIDTH = Dimensions.get('window').width;

    const option = options.map((item,id)=>{
        return(
            <TouchableOpacity key={id}>
                <Text style={styles.text} onPress={()=>setModalVisible(false)}>{item}</Text>
            </TouchableOpacity>
        )
    });

    return ( 
         <View style={[styles.modal,styles.container,{width:WIDTH-20,height:'auto'}]}>
             <ScrollView>
                {option}
             </ScrollView>
         </View>
    )
};
  
  const styles = StyleSheet.create({
    text:{
        fontSize:25
    },
    container:{

    },
    modal:{
        backgroundColor:'white',
        borderRadius:20,
        elevation: 10,
    }
  });

export default ModalSelection;