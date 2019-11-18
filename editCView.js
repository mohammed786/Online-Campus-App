import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Button,
    Text,
    StatusBar,
} from 'react-native';

import axios from 'axios'

import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
// import console = require('console');

var radio_props = [
    { label: 'submitted', value: 0 },
    { label: 'Processing', value: 1 },
    { label: 'closed', value: 2 }
];

// submitted, processing, closed

class editCView extends React.Component {
    // const {navigate} = this.props.navigation;
    constructor() {
        super()
        state = {
            value: null
        }
    }

    setStatus = () => {
        this.setState(
            { value: this.props.navigation.getParam('status', 'status') }
        )
    }

    changeStatus = () => {
        console.log('changestatus', this.state.value)
        const idx = this.props.navigation.getParam('id', 'id')
        let label = 'submitted'
        if (this.state.value == 1) {
            label = 'processing'
        } else if (this.state.value == 2) {
            label = 'closed'
        }
        const patchData = {
            'status': label
        }
        const headers = {
            'Authorization': 'Bearer ' + this.props.navigation.getParam('token', 'token')
        }
        axios({
            method: 'PATCH',
            url: 'https://201751025.pythonanywhere.com/complaint/update/' + idx,
            headers: headers,
            data: patchData
        }).then((response) => {
            console.log('resp', response.data)
        }).catch((error) => {
            console.log(error)
        });

        this.props.navigation.navigate('Complaint')
    }

    componentDidMount = () => {
        this.setStatus()
    }
    render() {
        const role = this.props.navigation.getParam('role', 'role')
        const status = this.props.navigation.getParam('status', 'status')
        const token = this.props.navigation.getParam('token', 'token')

        let val = 0;
        if (status == 'processing') val = 1
        if (status == 'closed') val = 2
        // 201752007@iiitvadodara.ac.in
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{this.props.navigation.getParam('title', 'title')}</Text>
                <Text style={styles.description}>{this.props.navigation.getParam('content', 'content')}</Text>
                <Text style={styles.statusDescription}>Status:</Text>
                {role == "faculty" &&
                    <View style={styles.status}>
                        <RadioForm
                            radio_props={radio_props}
                            initial={val}
                            onPress={(value) => { this.setState({ value: value }) }}
                        />

                        <Button title='Update Status' onPress={this.changeStatus}> </Button>
                    </View>
                }
                {
                    status != "faculty" &&
                    <Text style={styles.status}>{status}</Text>
                }
                {/* <RadioButton style={styles.radio} label="Pubished" checked value="Value" />
                <RadioButton label="Processing" value="Value" />
                <RadioButton label="Done" value="Value" /> */}
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 5,
    },
    button: {
        width: 200,
        height: 70,
        backgroundColor: 'blue',
        marginTop: 150,
        marginLeft: 100,
    },
    radio: {
        // marginLeft: 'auto',
        // marginRight: 'auto',
        paddingLeft: 30,
        marginTop: 20,
    },
    title: {
        marginTop: 5,
        color: '#1976d2',
        fontSize: 40,
        paddingLeft: 30,
        textAlign: 'center'
    },
    description: {
        fontSize: 20,
        paddingLeft: 30,
        marginTop: 20,
        marginBottom: 40
    },
    statusDescription: {
        paddingLeft: 30,
        fontSize: 20,
        marginTop: 50,
        fontWeight: 'bold',
    },
    status: {
        // textAlign: 'center',
        fontSize: 20,
        paddingLeft: 30,
    }
});

export default (editCView);

