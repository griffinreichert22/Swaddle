import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Chip, Text, Title, withTheme } from 'react-native-paper';
import { connect } from 'react-redux'
import Header from '../Header';
import MediaButton from '../MediaButton';

class Feed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null
        };
    }
    componentDidMount() {
        this._refresh = this.props.navigation.addListener(
            'focus', () => {
                console.log('refreshing')
            }
        );
    }

    // componentWillUnmount() {
    //     this._refresh.remove();
    // }

    render() {
        return (
            <View style={[style.container, { backgroundColor: this.props.theme.colors.background }]}>
                <Header navigation={this.props.navigation} />
                <View style={style.inner}>
                {this.state.image && <Image
                    style={{ height: 180, margin: 20 }}
                    resizeMode="contain"
                    source={{ uri: `data:image/jpeg;base64,${this.state.image}` }}
                />}
                <Card>
                    <Card.Title title="Post" />
                    <Card.Cover source={{uri: 'https://picsum.photos/600/800' }} style={{marginVertical: 10}}/>
                    <Card.Content>
                        <Text>hi</Text>
                        <Chip></Chip>
                    </Card.Content>

                </Card>
                </View>
                <MediaButton navigation={this.props.navigation} />
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    inner: {
        flex: 1,
        margin: 20,
    },

    button: {
        marginVertical: 10,
        padding: 10
    },
});

// maps state
const mapStateToProps = (state) => {
    return {
        login_status: state.authReducer.login_status,
        username: state.authReducer.username,
        session_token: state.authReducer.session_token,
    }
}

// maps actions
const mapDispatchToProps = (dispatch) => {
    return {
        rlogin: (username, session_token) => dispatch(login(username, session_token)),
        rlogout: () => dispatch(logout()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Feed));