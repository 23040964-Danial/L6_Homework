import React from 'react';
import { View, Text, SectionList, StatusBar, Button, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { datasource } from './Data';

const Home = ({ navigation, route }) => {

    if (route.params?.newPokemon) {
        const newPokemon = route.params.newPokemon;


        const sectionIndex = datasource.findIndex(section => section.title === newPokemon.section);

        if (sectionIndex !== -1) {
            datasource[sectionIndex].data.push({ name: newPokemon.name, imageUrl: newPokemon.imageUrl });
        }
    }

    if (route.params?.updatedPokemon) {
        const { index, name, imageUrl, sectionTitle } = route.params.updatedPokemon;


        const sectionIndex = datasource.findIndex(section => section.title === sectionTitle);

        if (sectionIndex !== -1) {
            datasource[sectionIndex].data[index] = { name, imageUrl };
        }
    }

    if (route.params?.deleteIndex !== undefined) {
        const { deleteIndex, sectionTitle } = route.params;

        const sectionIndex = datasource.findIndex(section => section.title === sectionTitle);

        if (sectionIndex !== -1) {
            datasource[sectionIndex].data.splice(deleteIndex, 1);
        }
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.itemContainer}
                          onPress={() => navigation.navigate('Edit', {
                              index: datasource.find(section => section.data.includes(item)).data.indexOf(item),
                              pokemon:item,
                              sectionTitle: datasource.find(section => section.data.includes(item)).title
                          })}>
            <Text style={styles.pokemonName}>{item.name}</Text>
            <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1 }}>
            <StatusBar hidden={true} />
            <Button title="Add Pokémon" onPress={() => navigation.navigate('Add')} />
            <SectionList
                sections={datasource}
                renderItem={renderItem}
                renderSectionHeader={({ section }) => (
                    <View style={[styles.headerContainer]}>
                        <Text style={[styles.headerText]}>{section.title}<Icon name={section.icon_name} size={20}/></Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#f7f7f7',
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginRight: 10,
        flexGrow: 1,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor:'#ccc',
    },
    pokemonName: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginRight: 10,
        flexGrow: 1,
    },
    cardImage: {
        width: 150,
        height: 200,
        resizeMode: 'contain',
    },
});

export default Home;
