import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Dimensions, ScrollView, Animated, Easing } from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Icon, SearchBar } from 'react-native-elements';

import { setCurrent } from '../actions';

import { Card, CardSection } from '../components/common';
import TabBar from '../components/TabBar';
import ImageGallery from '../components/ImageGallery';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const HEADER_HEIGHT = SCREEN_HEIGHT >= 812 ? SCREEN_HEIGHT * 0.11 : SCREEN_HEIGHT * 0.10;
const TABBAR_HEIGHT = SCREEN_HEIGHT === 812 ? 88 : 65;

const TOP_PADDING = HEADER_HEIGHT * 0.30;

const HEADER_TITLE = ['Home', 'Inicio'];
const TOPIC_TITLE = ['CHOOSE A TOPIC', 'ESCOGE UN TEMA'];
const STARTOVER_LABEL = ['RESTART', 'REINICIAR'];
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
    
    componentWillMount() {
        this.animatedSearchBar = new Animated.Value(-HEADER_HEIGHT);
        this.animatedNextScreen = new Animated.Value(0);
    }
    
    componentWillReceiveProps(nextProps) {
        const newCurrent = nextProps.current;
        
        if (newCurrent !== this.props.current && newCurrent.type === 'back') {
            Animated.timing(this.animatedNextScreen, {
                toValue: -SCREEN_WIDTH,
                duration: 0
            }).start(() => {
                Animated.timing(this.animatedNextScreen, {
                    toValue: 0,
                    duration: 200
                }).start();
            });
        }
    }
    
    // EVENT HANDLERS
    setCurrentQuestion(id, navigationType) {
        if (navigationType === 'back') {
            this.props.setCurrent(_.isNil(id) ? {} : this.props.questions[id], navigationType);
        } else {
            this.props.setCurrent(_.isNil(id) ? {} : this.props.questions[id]);
            if (this.animatedNextScreen.__getValue() === 0) {
                Animated.timing(this.animatedNextScreen, {
                    toValue: SCREEN_WIDTH,
                    duration: 0
                }).start(() => {
                    Animated.timing(this.animatedNextScreen, {
                        toValue: 0,
                        duration: 200
                    }).start();
                });
            }
        }
    }
    
    setRoot(id) {
        this.setState({ currentRoot: id });
        this.setCurrentQuestion(id);
    }
    
    startOver() {
        this.setCurrentQuestion(this.state.currentRoot, 'back');
    }
    
    onChangeSearchTerm(term) {
        this.setState({ searchTerm: term });
    }
    
    displaySearchBar() {
        const { searchBarHidden } = this.state;
        
        if (searchBarHidden) {
            this.setState({
                searchBarHidden: !this.state.searchBarHidden
            }, () => {
                Animated.timing(this.animatedSearchBar, {
                    toValue: 0,
                    duration: 200
                }).start();
            });
        } else {
            Animated.timing(this.animatedSearchBar, {
                toValue: -HEADER_HEIGHT,
                duration: 200
            }).start(() => {
                this.setState({ searchBarHidden: !this.state.searchBarHidden });
            });
        }
        
    }
    
    // RENDER HELPERS
    renderOptions() {
        const cardWidth = SCREEN_WIDTH - 12;
        
        return this.props.current.currentQuestion.options.map((option) => {
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
        const { currentQuestion } = current;
        
        console.log('SCREEN HEIGHT', SCREEN_HEIGHT);
        
        const header = (
            !_.isEmpty(currentQuestion) ?
                <Animated.View style={styles.headerStyle}>
                    <Icon
                        name='navigate-before'
                        size={34}
                        color='white'
                        underlayColor='#01579b'
                        containerStyle={{
                            padding: 5,
                            marginTop: TOP_PADDING
                        }}
                        onPress={() => this.setCurrentQuestion(currentQuestion.previous, 'back')}
                    />
                    {(this.state.currentRoot && currentQuestion.question[language] === questions[this.state.currentRoot].question[language]) ?
                        <View /> :
                        <Text
                            style={styles.startOverStyle}
                            onPress={() => this.startOver()}
                        >
                            {STARTOVER_LABEL[language]}
                        </Text>
                    }
                </Animated.View>
                :
                <Animated.View style={styles.mainHeaderStyle}>
                    <View style={{ flex: 1 }}/>
                    <Text style={styles.headerTitleStyle}>{HEADER_TITLE[language]}</Text>
                    <Icon
                        style={{ flex: 1 }}
                        name='search'
                        size={34}
                        color='white'
                        underlayColor='#01579b'
                        containerStyle={{
                            padding: 5,
                            marginTop: TOP_PADDING,
                            marginRight: 5
                        }}
                        onPress={() => this.displaySearchBar()}
                    />
                </Animated.View>
        );
    
        const topLevelQuestions = Object.keys(questions).filter((key) => {
            return questions[key].previous === null && questions[key].subject[language].toLowerCase().includes(this.state.searchTerm.trim().toLowerCase());
        });
        
        const content = (
            !_.isEmpty(currentQuestion) ?
                <View style={{ flex: 1 }}>
                    <Text style={[styles.titleTextStyle]}>{currentQuestion.question[language]}</Text>
                    {
                        (!_.isNil(currentQuestion.images) && _.size(currentQuestion.images) > 0) &&
                        <ImageGallery images={currentQuestion.images} />
                    }
                    {
                        (!_.isNil(currentQuestion.description) && _.size(currentQuestion.description) > 0) &&
                        <Text style={styles.descriptionStyle}>{currentQuestion.description[language]}</Text>
                    }
                    <Animated.ScrollView style={styles.optionListStyle}>
                        {this.renderOptions()}
                    </Animated.ScrollView>
                </View>
                :
                <View style={{ flex: 1 }}>
                    <View style={styles.titleStyle}>
                        <Text style={styles.titleTextStyle}>{TOPIC_TITLE[language]}</Text>
                    </View>
                    <ScrollView>
                        {this.renderTopLevelQuestions(topLevelQuestions)}
                    </ScrollView>
                </View>
        );
        
        return (
            <Animated.View style={{ flex: 1, opacity: this.animInverseZoomVal }}>
                {header}
                {
                    _.isEmpty(currentQuestion) &&
                        <Animated.View
                            style={{ zIndex: -1, transform: [ { translateY: this.animatedSearchBar }]}}
                        >
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
                        </Animated.View>
                }
                <Animated.View style={{ flex: 1, transform: [ { translateX: this.animatedNextScreen }]}}>
                    {content}
                </Animated.View>
                <TabBar />
            </Animated.View>
        );
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
        textAlign: 'center',
        marginLeft: 15
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
        fontSize: 22,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10
    },
    descriptionStyle: {
        textAlign: 'center',
        color: '#45494f',
        fontSize: 14,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10
    },
    optionListStyle: {
        marginTop: 15,
        zIndex: -2
    },
    startOverStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        padding: 5,
        marginRight: 5,
        marginTop: TOP_PADDING
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