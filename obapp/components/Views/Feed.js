import { isLoaded } from 'expo-font';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, Chip, Text, Title, withTheme } from 'react-native-paper';
import { connect } from 'react-redux'
import Header from '../Header';
import MediaButton from '../MediaButton';

class Feed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            tags: ['baby', 'cute', 'awwww', 'adorable'],
            isLoaded: false,
        };
    }
    componentDidMount() {
        this.loadPosts()
        this._refresh = this.props.navigation.addListener(
            'focus', () => {
                console.log("refresh")
            }
        );
    }

    loadPosts() {
        this.setState({image: 'https://picsum.photos/600/400', isLoaded: true})
    }

    // componentWillUnmount() {
    //     this._refresh.remove();
    // }

    makeChip(name) {
        return (
            <View
                key={name}
                style={{ margin: 5, flexWrap: 'wrap' }}>
                <Chip
                    icon='owl'
                    mode='outlined'
                    style={{backgroundColor: this.props.theme.colors.accent}}
                    onPress={() => console.log(name)}>
                    {name}
                </Chip>
            </View>
        )
    }

    render() {
        return (
            <View style={[style.container, { backgroundColor: this.props.theme.colors.background }]}>
                <Header navigation={this.props.navigation} />
                {this.state.isLoaded && <View style={style.inner}>
                    <Card>
                        <Card.Title title="Post" style={{marginLeft: 10}}/>
                        <Card.Cover source={{ uri: this.state.image }} style={{ marginVertical: 10 }} />
                        <Card.Content>
                            <ScrollView horizontal={true}>
                                {this.state.tags.map((name) => this.makeChip(name))}
                            </ScrollView>
                        </Card.Content>
                    </Card>
                </View>}
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