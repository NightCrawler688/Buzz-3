import React from 'react';
import {StyleSheet,Text,View,TouchableOpacity,} from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';

export default class TransactionScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            hasCameraPermissions:null,
            scanned:false,
            scannedData:" ",
            buttonState:'normal'
        }
    }
    getCameraPermission=async()=>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermissions:status==='granted',buttonState:'clicked'
        })
    }
    handleBarCodeScanned=async({type,data})=>{
       this.setState({
           scanned:true,
           scannedData:data,
           buttonState:'normal'
       })
    }
    render() {
        const hasCameraPermissions = this.state.hasCameraPermissions;
        const scanned = this.state.scanned;
        const buttonState =  this.state.buttonState;
        if(buttonState==='clicked' && hasCameraPermissions) {
            return(
             <BarCodeScanner onBarCodeScanned = {scanned===true?undefined:this.handleBarCodeScanned} style = {StyleSheet.absoluteFillObject}/>
            )
        }
        else if(buttonState==='normal'){
        return(
            <View style = {{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text style = {styles.displayText}>
                   {hasCameraPermissions===true?this.state.scannedData:'request camera permissions'}
                </Text>
                <TouchableOpacity style = {styles.scanButton} onPress = {
                    this.getCameraPermission
                }>
                    <Text style = {styles.buttonText}>
                        SCAN QR CODE
                    </Text>
                </TouchableOpacity>
            </View>
        )
            }
    }

}
const styles = StyleSheet.create({
    displayText:{
         fontSize:15,
         textDecorationLine:'underline'
    },
    scanButton:{
        backgroundColor:'blue',
        margin:10,
        padding:20
    },
    buttonText:{
        fontSize:10
    }
})