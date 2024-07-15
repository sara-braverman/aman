import express from 'express';
import bodyParser from 'body-parser';
import { createMappings } from './services/elasticsearchService';
import productRoute from './routes/productRoute';
import categoryRoute from './routes/categoryRoute';
import customerRoute from './routes/customerRoute';
import cartRoute from './routes/cartRoute';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
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
        // Start the server after Elasticsearch setup
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error setting up Elasticsearch:', error);
        process.exit(1); // Exit with failure status
    }
}

setupElasticsearch();

export default app;
