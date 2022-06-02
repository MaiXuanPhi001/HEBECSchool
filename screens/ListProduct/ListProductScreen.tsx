import React, { useContext, useEffect } from "react"
import { ScrollView, Text, View } from "react-native"
import { Header } from "./components/Header";
import { ListProduct } from "./components/ListProduct";
import axios from "axios";
import { AuthContext } from "../../types/Context";

export const ListProductScreen = ({ navigation, route }: any) => {
    const [products, setProducts] = React.useState([]);
    const[auth] = useContext(AuthContext);
    const { id } = route.params;
    useEffect(() => {
        fetchBooks();
    }, [])
    async function fetchBooks() {
        axios('https://163clone.bmdapp.store:4164/v1/customer/book?categoryId='+id, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                token: auth,
            },
        })
        .then((response) => {setProducts(response.data.data.data);})
        .catch(() => {
            console.log('error');
        });
    }
    return (
        <ScrollView>
            <Header navigation = {navigation}/>
            <Text style = {{fontSize: 16, color: "#231F20", marginLeft: 20}}>Có <Text style = {{color: '#489620', fontWeight:'700'}}>{products.length}</Text> kết quả phù hợp</Text>
            <ListProduct data = {products} navigation = {navigation}/>
        </ScrollView>
    )
}