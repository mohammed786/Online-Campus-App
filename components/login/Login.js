import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    TextInput,
    StatusBar,
    KeyboardAvoidingView
} from 'react-native';
import axios from 'axios'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button } from 'react-native-material-ui';
import { TextField } from 'react-native-materialui-textfield';


class Login extends React.Component { 

    state = {
        username: '',
        password: '',
        token: null
    }

    
    onChangeText = (key, val) => {
        this.setState({ [key]: val })
        console.log('ok', this.state.username, this.state.password)
    }

    handleLogin = () => {
        console.log('clicked')
        const postData = {
            'username': this.state.username,
            'password': this.state.password
        }
        console.log('ok', this.state.username, this.state.password)
        // const postData = {'username': 'neeraj4', 'password': 'p'}
        axios({
            method: 'POST',
            url: 'https://201751025.pythonanywhere.com/auth/token/obtain',
            data: postData
            }).then((response) => {
                console.log('resp', response.data.access)
                this.setState({
                    token: response.data
                })
                this.props.navigation.navigate('Complaint', {'token': response.data})
            }).catch((error) => {
                console.log(error)
            });        
    }
    
    render() {

        return (
            <View KeyboardAvoidingView behaviour="padding" style={styles.container}>
                <StatusBar
                    barStyle="light-content"
                />
                <TextField
                    style={styles.input}
                    label="Email"
                    returnKeyType="next"
                    onSubmitEditing={() => this.passwordInput.focus()}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={val => this.onChangeText('username', val)}
                />
                <TextField
                    style={styles.input}
                    label="Password"
                    secureTextEntry
                    returnKeyType="go"
                    ref={(input) => this.passwordInput = input}
                    onChangeText={val => this.onChangeText('password', val)}
                />
                <Button primary raised text="Login" onPress={this.handleLogin}/>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20
    }
});

export default (Login);

