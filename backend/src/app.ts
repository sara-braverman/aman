import express from 'express';
import bodyParser from 'body-parser';
import { createMappings } from './services/elasticsearchService';
import productRoute from './routes/productRoute';
import categoryRoute from './routes/categoryRoute';
import customerRoute from './routes/customerRoute';
import cartRoute from './routes/cartRoute';

const app = express();
const PORT = 3000;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3500");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");

    if (req.method === "OPTIONS") {
        return res.sendStatus(204); // Respond OK to preflight requests
    }

    next();
});

app.use(express.json());
app.use(bodyParser.json());

app.use('/products', productRoute);
app.use('/categories', categoryRoute);
app.use('/customers', customerRoute);
app.use('/carts', cartRoute);

// Elasticsearch setup
async function setupElasticsearch() {
    try {
        await createMappings();
        console.log('Elasticsearch mappings created successfully.');
        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error setting up Elasticsearch:', error);
        process.exit(1);
    }
}

setupElasticsearch();

export default app;
