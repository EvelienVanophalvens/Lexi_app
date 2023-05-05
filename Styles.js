import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    viewStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 60,
        marginTop: 20,
    },

    title: {
        fontSize: 30,
        color: "black",
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        marginLeft:-10,
        marginRight: -10,
    },

    titlePurple: {
            
        marginBottom: 30,
        margin: -20,
        backgroundColor: '#7D4CFF',
        padding: 20,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: "center",
    },

    titleWhite: {
        fontSize: 30,
        textAlign: 'center',
        color: 'white',
        flex: 1,
        marginRight:-60,
        fontFamily: 'recoleta',
    },


    bodyBig: {
        fontSize: 25,
        color: "black",
    },

    body: {
        fontSize: 20,
        color: "black",
    },

    bodySmall: {
        fontSize: 16,
        color: "black",
    },

    txtPurple: {
        color: "#7D4CFF",
    },



    login: {
        flex: 1,

    },

    logoView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },

    label: {
        marginBottom: 5,
    },

    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
        borderRadius: 5,
        color: 'black',
    },

    forgotPassword: {
        marginBottom: 60,
        borderBottomColor: '#00000',
        borderBottomWidth: 1,
        alignSelf: 'flex-start',
        
    },

    button: {
        alignItems: "center",
        backgroundColor: "#7D4CFF",
        padding: 22.5,
        width: 190,
        color: 'white',
        textAlign: 'center',
        borderRadius: 5,
        fontWeight: 'bold',
    },

    button2: {
        alignItems: "center",
        justifyContent: 'center',
        marginTop: 20,
    },

    buttonLong: {
        alignItems: "center",
        backgroundColor: "#7D4CFF",
        padding: 22.5,
        width: 300,
        color: 'white',
        textAlign: 'center',
        borderRadius: 5,
        fontWeight: 'bold',
    },


    registration: {
        marginLeft:-40,
        marginRight:-40,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 150,

    },

    View: {
        flex: 1,
        padding: 60,
        marginTop: 20,
    },

    profileImg: {
        width: 100,
        height: 100,
        borderRadius: 100,
        marginBottom: 20,
    },

    icon: {
        marginHorizontal: 10,
    },

    switchView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    subTitle: {
        borderRadius: 10,
        padding: 10,
        fontSize: 30,
        backgroundColor: "#9777F4",
        color: 'white',
        margin: -20,
        marginTop: 30,
    },

    friends: {
        marginTop: 30,
        margin: -20,
        textAlign: 'center',
        fontFamily: 'nunito',
    },

    listItem: {
        padding: 20,
        marginVertical: 5,
        backgroundColor: '#E2EBF2',
        borderRadius: 10,
        marginTop: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    img: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginRight: 20,
    },

    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },




});

export {styles};
