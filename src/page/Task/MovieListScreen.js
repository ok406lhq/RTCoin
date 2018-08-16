import React, {Component} from 'react';
import {
    View,
    FlatList,
    Text,
    ActivityIndicator,
    StyleSheet,
    BackHandler,
    Dimensions,
    StatusBar, Platform
} from 'react-native';
import {queryMovies, comingMovies} from '../../utils/apiUtils';
import MovieItemCell from "../../widget/MovieItemCell";
import NavBar from "../../common/NavBar";
import px2dp from "../../utils/px2dp";

const {width} = Dimensions.get('window');
export default class MovieListScreen extends Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            movieList: [],  // 电影列表的数据源
            loaded: false,  // 用来控制loading视图的显示，当数据加载完成，loading视图不再显示
        };
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }

    onBackAndroid = () => {
        const {navigate, goBack, state} = this.props.navigation;
        state.params.returnData(2);
        goBack();
        // this.props.navigation.state.params.returnData(2);
        // this.props.navigation.goBack();
        return true;
    };

    componentDidMount() {
        /// 根据routeName来判断当前是哪个界面，react-navigation中可以通过navigation.state.routeName来获取
        let routeName = this.props.navigation.state.routeName;
        if (routeName === 'First') {
            this.loadComingMovies();

        } else {
            this.loadDisplayingMovies();
        }
    }

    render() {
        if (!this.state.loaded) {
            return (
                <View style={styles.loadingView}>
                    <ActivityIndicator animating={true} size="small"/>
                    <Text style={{color: '#666666', paddingLeft: 10}}>努力加载中</Text>
                </View>
            )
        }
        return (
            <View style={{flex: 1}}>
                <StatusBar
                    translucent={false}
                    animated={true}
                    backgroundColor={"#1E82D2"}
                    barStyle={"light-content"}
                />
                <NavBar
                    title="豆瓣电影"
                    leftIcon="ios-arrow-back"
                    leftPress={
                        // const {navigate, goBack, state} = this.props.navigation;
                        // state.params.returnData(2);
                        // goBack();
                        this.leftPress
                    }
                    // titleStyle={styles.titleStyle}
                    // style={styles.style}
                />
                <FlatList
                    data={this.state.movieList}
                    renderItem={this._renderItem}
                    keyExtractor={(item) => item.id}
                /></View>
        )
    }

    leftPress = () => {
        this.props.navigation.state.params.returnData(2);
        this.props.navigation.goBack();
    };

    _renderItem = (item) => {
        return (
            <MovieItemCell movie={item.item} onPress={() => {
                console.log('点击了电影----' + item.item.title);
            }}/>
        )
    };

    /**
     * 加载正在上映的电影列表，此处默认城市为深圳，取30条数据显示
     */
    loadDisplayingMovies() {
        let that = this;
        fetch(queryMovies('深圳', 0, 30)).then((response) => response.json()).then((json) => {
            console.log(json);
            let movies = [];
            for (let idx in json.subjects) {
                let movieItem = json.subjects[idx];
                let directors = ""; // 导演
                for (let index in movieItem.directors) {
                    // 得到每一条电影的数据
                    let director = movieItem.directors[index];
                    // 将多个导演的名字用空格分隔开显示
                    if (directors === "") {
                        directors = directors + director.name
                    } else {
                        directors = directors + " " + director.name
                    }
                }
                movieItem["directorNames"] = directors;

                // 拼装主演的演员名字，多个名字用空格分隔显示
                let actors = "";
                for (let index in movieItem.casts) {
                    let actor = movieItem.casts[index];
                    if (actors === "") {
                        actors = actors + actor.name
                    } else {
                        actors = actors + " " + actor.name
                    }
                }
                movieItem["actorNames"] = actors;
                movies.push(movieItem)
            }
            that.setState({
                movieList: movies,
                loaded: true
            })
        }).catch((e) => {
            console.log("加载失败");
            that.setState({
                loaded: true
            })
        }).done();
    }

    /**
     * 加载即将上映的电影列表，此处默认城市为北京，取20条数据显示
     */
    loadComingMovies() {
        let that = this;
        fetch(comingMovies('北京', 0, 20)).then((response) => response.json()).then((json) => {
            console.log(json);
            if (json == null) {
                that.setState({
                    loaded: true,
                });
                return
            }
            let movies = [];
            for (let idx in json.subjects) {
                let movieItem = json.subjects[idx];
                let directors = "";
                for (let index in movieItem.directors) {
                    let director = movieItem.directors[index];
                    if (directors === "") {
                        directors = directors + director.name
                    } else {
                        directors = directors + " " + director.name
                    }
                }
                movieItem["directorNames"] = directors;

                let actors = "";
                for (let index in movieItem.casts) {
                    let actor = movieItem.casts[index];
                    if (actors === "") {
                        actors = actors + actor.name
                    } else {
                        actors = actors + " " + actor.name
                    }
                }
                movieItem["actorNames"] = actors;
                movies.push(movieItem)
            }
            that.setState({
                movieList: movies,
                loaded: true,
            })
        }).catch((error) => {
            console.log("加载失败");
            that.setState({
                loaded: true
            })
        }).done();
    }
}

const styles = StyleSheet.create({
    loadingView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    sBar: {
        height: StatusBar.currentHeight,
        width: width
    },
    style: {
        height: NavBar.topbarHeight,
        backgroundColor: "#fff",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,
        paddingHorizontal: px2dp(10)
    },
    titleStyle: {
        fontSize: 16,
        color: '#000',
        fontWeight: "bold",
    }
});
