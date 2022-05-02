import { View, Text,StyleSheet,Modal } from 'react-native'
import React, { useState } from 'react'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { SelectInput } from '@/components/atoms';
import ModalSelection from '@/components/atoms/Modal/ModalSelection';

const SelectOptions = ({style,defaultValue,options}) => {
    const [isModalVisible,setModalVisible] = useState(false);

    return ( 
     <View style={[style]}>
         <SelectInput style={styles.text}  text={defaultValue} onPress={()=>{console.log("preesed");setModalVisible(!isModalVisible)}}></SelectInput>
     </View>
    )
};
  
  const styles = StyleSheet.create({
    text:{
        fontSize:12,
        fontWeight:'bold',
        color:'black',
        paddingVertical:15

    },
  });

export default SelectOptions;

/*<View  style={styles.container} >
<ModalSelection options={options} setModalVisible={setModalVisible} />
</View>*/