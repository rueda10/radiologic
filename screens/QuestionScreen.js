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

const HEADER_HEIGHT = SCREEN_HEIGHT === 812 ? 88 : 65;
const TABBAR_HEIGHT = SCREEN_HEIGHT === 812 ? 88 : 65;

const TOP_PADDING = SCREEN_HEIGHT === 812 ? 35 : 25;

const HEADER_TITLE = ['Home', 'Inicio'];
const TOPIC_TITLE = ['Choose a topic to begin', 'Escoge un tema para empezar'];
const STARTOVER_LABEL = ['START OVER', 'REINICIAR'];
const SEARCH_PLACEHOLDER = ['Search topics...', 'Busca temas...'];

class QuestionScreen extends Component {
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        
        this.state = {
            currentRoot: null,
            searchTerm: '',
            searchBarHidden: true
        }
    }
    
    // EVENT HANDLERS
    setCurrentQuestion(id) {
        this.props.setCurrent(_.isNil(id) ? {} : this.props.questions[id]);
    }
    
    setRoot(id) {
        this.setState({ currentRoot: id });
        this.setCurrentQuestion(id);
    }
    
    startOver() {
        this.setCurrentQuestion(this.state.currentRoot);
    }
    
    onChangeSearchTerm(term) {
        this.setState({ searchTerm: term });
    }
    
    displaySearchBar() {
        this.setState({ searchBarHidden: !this.state.searchBarHidden });
    }
    
    // RENDER HELPERS
    renderOptions() {
        const cardWidth = SCREEN_WIDTH - 12;
        
        return this.props.current.options.map((option) => {
            let button = (
                <Card key={`${option.option[this.props.language]}`}>
                    <CardSection style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ width: cardWidth - 60, fontSize: 16 }}>{option.option[this.props.language]}</Text>
                        {
                            !_.isNil(option.next) ?
                                <Icon style={{ marginLeft: 10 }} name='navigate-next' size={20} color='#01579b'/>
                                :
                                <View/>
                        }
                    </CardSection>
                </Card>
            );
            
            if (!_.isNil(option.next)) {
                button = (
                    <TouchableOpacity key={`${option.option[this.props.language]}-${option.next}`} onPress={() => this.setCurrentQuestion(option.next)}>
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
                <TouchableOpacity key={`${this.props.questions[id].subject[this.props.language]}`} onPress={() => this.setRoot(id)}>
                    <Card>
                        <CardSection style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ width: cardWidth - 60, fontSize: 16 }}>{this.props.questions[id].subject[this.props.language]}</Text>
                            <Icon style={{ paddingLeft: 60 }} name='navigate-next' size={20} color='#01579b'/>
                        </CardSection>
                    </Card>
                </TouchableOpacity>
            );
        });
    }
    
    // RENDER METHOD
    render() {
        const { current, language, questions } = this.props;
        
        const middleContentHeight = SCREEN_HEIGHT - HEADER_HEIGHT - TABBAR_HEIGHT;
        
        if (!_.isEmpty(current)) {
            // ALGORITHM SCREENS
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
                                paddingTop: TOP_PADDING
                            }}
                            onPress={() => this.setCurrentQuestion(current.previous)}
                        />
                        {(this.state.currentRoot && current.question[language] === questions[this.state.currentRoot].question[language]) ?
                            <View /> :
                            <Text
                                style={styles.startOverStyle}
                                onPress={() => this.startOver()}
                            >
                                {STARTOVER_LABEL[language]}
                            </Text>
                        }
                    </View>
                    <View style={{ height: middleContentHeight }}>
                        <View style={styles.titleStyle}>
                            <Text style={styles.titleTextStyle}>{current.question[language]}</Text>
                            {
                                (!_.isNil(current.description) && _.size(current.description) > 0) &&
                                <Text style={styles.descriptionStyle}>{current.description[language]}</Text>
                            }
                            {
                                (!_.isNil(current.images) && _.size(current.images) > 0) &&
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
            // HOME SCREEN
            const topLevelQuestions = Object.keys(questions).filter((key) => {
                return questions[key].previous === null && questions[key].subject[language].toLowerCase().includes(this.state.searchTerm.trim().toLowerCase());
            });
            
            return (
                <View style={{ flex: 1 }}>
                    <View style={styles.mainHeaderStyle}>
                        <View style={{ flex: 1 }}/>
                        <Text style={styles.headerTitleStyle}>{HEADER_TITLE[language]}</Text>
                        <Icon
                            style={{ flex: 1 }}
                            name='search'
                            size={34}
                            color='white'
                            underlayColor='#01579b'
                            containerStyle={{
                                paddingRight: 5,
                                paddingTop: TOP_PADDING
                            }}
                            onPress={() => this.displaySearchBar()}
                        />
                    </View>
                    <View style={{ height: middleContentHeight }}>
                        <View>
                            {
                                !this.state.searchBarHidden &&
                                <SearchBar
                                    lightTheme
                                    containerStyle={styles.searchBarContainerStyle}
                                    inputStyle={styles.searchBarInputStyle}
                                    onChangeText={(text) => this.onChangeSearchTerm(text)}
                                    placeholder={SEARCH_PLACEHOLDER[language]}
                                />
                            }
                        </View>
                        <View style={styles.titleStyle}>
                            <Text style={styles.titleTextStyle}>{TOPIC_TITLE[language]}</Text>
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
        height: HEADER_HEIGHT,
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
        height: HEADER_HEIGHT,
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
    headerTitleStyle: {
        flex: 7,
        paddingTop: TOP_PADDING,
        fontSize: 26,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    titleStyle: {
        width: SCREEN_WIDTH,
        paddingLeft: 15,
        paddingRight: 15,
        marginTop: 15,
        marginBottom: 15
    },
    titleTextStyle: {
        textAlign: 'center',
        color: '#01579b',
        fontWeight: '800',
        fontSize: 25,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5
    },
    descriptionStyle: {
        color: '#45494f',
        fontSize: 14,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10
    },
    startOverStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        marginRight: 10,
        paddingTop: TOP_PADDING
    },
    searchBarContainerStyle: {
        backgroundColor: '#01579b'
    },
    searchBarInputStyle: {
        backgroundColor: 'white'
    }
};

function mapStateToProps({ questions, current, language }) {
    return {
        questions,
        current,
        language
    };
}

export default connect(mapStateToProps, { setCurrent })(QuestionScreen);