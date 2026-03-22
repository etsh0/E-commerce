import { useEffect, useState } from "react";
import axios from "axios";
import { domain } from "../../../store";
import { ProductCard } from "../../../components/ProductCard";

export const FeaturedLatest = () => {
    const [products, setProducts] = useState([]);
    const [activeTab, setActiveTab] = useState("latest"); 

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const params = {
                    populate: "*",
                    pagination: { limit: 4 }, 
                };

                if (activeTab === "latest") {
                    params.sort = ["createdAt:desc"];
                } else if (activeTab === "featured") {
                    params.filters = {
                        isFeatured: { $eq: true }
                    };
                }

                const res = await axios.get(`${domain}/api/products`, { params });
                setProducts(res.data.data);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchProducts();
    }, [activeTab]); 

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">

                <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                    <h2 className="text-3xl font-bold uppercase tracking-tight">
                        {activeTab === "latest" ? "New Arrivals" : "Featured Items"}
                    </h2>
                    
                    <div className="flex gap-6 mt-4 md:mt-0 text-sm font-medium">
                        <button 
                            onClick={() => setActiveTab("latest")}
                            className={`cursor-pointer transition-colors ${activeTab === 'latest' ? 'text-black border-b-2 border-black' : 'text-gray-400'}`}
                        >
                            LATEST
                        </button>
                        <button 
                            onClick={() => setActiveTab("featured")}
                            className={`cursor-pointer transition-colors ${activeTab === 'featured' ? 'text-black border-b-2 border-black' : 'text-gray-400'}`}
                        >
                            FEATURED
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <ProductCard key={product.documentId} product={product}/>
                    ))}
                </div>
            </div>
        </section>
    );
};