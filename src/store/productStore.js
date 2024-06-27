import { defineStore } from 'pinia';
import axios from 'axios';
import { router } from '@/router';
import { useAuthStore } from './authStore';
import { toast } from "vue3-toastify";

const baseUrl = `${process.env.VUE_APP_API_URL}/products`;

export const useProductStore = defineStore({
    id: 'product',
    state: () => ({
        listProducts: []
    }),
    getters: {
        getUserId(){
            const data = useAuthStore()
            return data.user.id;
        }
    },
    actions: {
        async getProducts() {
            const idUser = this.getUserId;
            const result = await axios.get(`${baseUrl}/all-products/${idUser}`);
            this.listProducts = result.data;
        },
        async addProduct(name, description) {
            const idUser = this.getUserId;
            await axios.post(`${baseUrl}/create-product`, { name, description, "user_id": idUser });
            router.push("/productos");
        },
        async deleteProduct(idProduct){
            const result = await axios.delete(`${baseUrl}/delete-products/${idProduct}`);
            this.listProducts = this.listProducts.filter(p => p.id !== idProduct);
            toast(result.data.message, {
                "theme": "auto",
                "type": "success",
                "dangerouslyHTMLString": true
            });
        }
    }
});