import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Icon, SearchBar } from 'react-native-elements';

import { setCurrent } from '../actions';

import { Card, CardSection } from '../components/common';
import TabBar from '../components/TabBar';
import ImageViewer from '../components/ImageViewer';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class QuestionScreen extends Component {
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        
        this.state = {
            currentRoot: null,
            searchTerm: ''
        }
    }
    
    // LIFECYCLE METHODS
    componentDidMount() {
        this.props.setCurrent({});
    }
    
    // EVENT HANDLERS
    setCurrentQuestion(link) {
        this.props.setCurrent(_.isNil(link) ? {} : this.props.questions[link]);
    }
    
    setRoot(link) {
        this.setState({ currentRoot: link });
        this.setCurrentQuestion(link);
    }
    
    startOver() {
        this.setCurrentQuestion(this.state.currentRoot);
    }
    
    onChangeSearchTerm(term) {
        this.setState({ searchTerm: term });
    }
    
    // RENDER HELPERS
    renderOptions() {
        const cardWidth = SCREEN_WIDTH - 12;
        
        return this.props.current.options.map((option) => {
            let button = (
                <Card key={`${option.option[0]}`}>
                    <CardSection style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ width: cardWidth - 60, fontSize: 16 }}>{option.option[0]}</Text>
                        {
                            !_.isNil(option.link) ?
                                <Icon style={{ marginLeft: 10 }} name='navigate-next' size={20} color='#01579b'/>
                                :
                                <View/>
                        }
                    </CardSection>
                </Card>
            );
            
            if (!_.isNil(option.link)) {
                button = (
                    <TouchableOpacity key={`${option.option[0]}-${option.link}`} onPress={() => this.setCurrentQuestion(option.link)}>
                        {button}
                    </TouchableOpacity>
                )
            }
            
            return button;
        });
    }
    
    renderTopLevelQuestions(ids) {
        const cardWidth = SCREEN_WIDTH - 12;
        
        return ids.map((id) => {
            return (
                <TouchableOpacity key={`${this.props.questions[id].subject[0]}`} onPress={() => this.setRoot(id)}>
                    <Card>
                        <CardSection style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ width: cardWidth - 60, fontSize: 16 }}>{this.props.questions[id].subject[0]}</Text>
                            <Icon style={{ paddingLeft: 60 }} name='navigate-next' size={20} color='#01579b'/>
                        </CardSection>
                    </Card>
                </TouchableOpacity>
            );
        });
    }
    
    // RENDER METHOD
    render() {
        const { current } = this.props;
        
        const middleContentHeight = SCREEN_HEIGHT - 130;
        
        if (!_.isEmpty(current)) {
            return (
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <View style={styles.headerStyle}>
                        <Icon
                            name='navigate-before'
                            size={34}
                            color='white'
                            underlayColor='#01579b'
                            containerStyle={{
                                marginLeft: 5,
                                marginTop: 25
                            }}
                            onPress={() => this.setCurrentQuestion(current.previous)}
                        />
                        {(this.state.currentRoot && current.question[0] === this.props.questions[this.state.currentRoot].question[0]) ?
                            <View /> :
                            <Text
                                style={styles.startOverStyle}
                                onPress={() => this.startOver()}
                            >
                                START OVER
                            </Text>
                        }
                    </View>
                    <View style={{ height: middleContentHeight }}>
                        <View style={styles.titleStyle}>
                            <Text style={styles.titleTextStyle}>{current.question[0]}</Text>
                            {
                                (!_.isNil(current.images) && _.size(current.images) !== 0) &&
                                    <ImageViewer images={current.images} />
                            }
                        </View>
                        <ScrollView>
                            {this.renderOptions()}
                        </ScrollView>
                    </View>
                    <TabBar />
                </View>
            );
        } else {
            const topLevelQuestions = Object.keys(this.props.questions).filter((key) => {
                return this.props.questions[key].previous === null && this.props.questions[key].subject[0].toLowerCase().includes(this.state.searchTerm.trim().toLowerCase());
            });
            
            return (
                <View style={{ flex: 1 }}>
                    <View style={styles.mainHeaderStyle}>
                        <Text style={styles.headerTitleStyle}>Home</Text>
                    </View>
                    <View style={{ height: middleContentHeight }}>
                        <View>
                            <SearchBar
                                lightTheme
                                containerStyle={styles.searchBarContainerStyle}
                                inputStyle={styles.searchBarInputStyle}
                                onChangeText={(text) => this.onChangeSearchTerm(text)}
                                placeholder='Type Here...'
                            />
                        </View>
                        <View style={styles.titleStyle}>
                            <Text style={styles.titleTextStyle}>Choose a question to begin</Text>
                        </View>
                        <ScrollView>
                            {this.renderTopLevelQuestions(topLevelQuestions)}
                        </ScrollView>
                    </View>
                    <TabBar />
                </View>
            )
        }
    }
}

const styles = {
    headerStyle: {
        top: 0,
        left: 0,
        right: 0,
        alignSelf: 'stretch',
        alignItems: 'center',
        height: 64,
        backgroundColor: '#01579b',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: '#4f83cc',
        borderBottomWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    mainHeaderStyle: {
        top: 0,
        left: 0,
        right: 0,
        alignSelf: 'stretch',
        alignItems: 'center',
        height: 64,
        backgroundColor: '#01579b',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    headerTitleStyle: {
        fontSize: 22,
        color: 'white',
        marginRight: 10,
        marginTop: 25,
        fontWeight: 'bold'
    },
    titleStyle: {
        width: SCREEN_WIDTH,
        padding: 10
    },
    titleTextStyle: {
        color: '#01579b',
        fontWeight: '800',
        fontSize: 25,
        padding: 10
    },
    startOverStyle: {
        fontSize: 18,
        color: 'white',
        marginRight: 10,
        marginTop: 25
    },
    searchBarContainerStyle: {
        backgroundColor: '#01579b'
    },
    searchBarInputStyle: {
        backgroundColor: 'white'
    }
};

function mapStateToProps({ questions, current }) {
    return {
        questions,
        current
    };
}

export default connect(mapStateToProps, { setCurrent })(QuestionScreen);