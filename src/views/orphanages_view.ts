import Orphanage from '../models/Orphanage';
import imagesView from './images_view';

export default {
    render(orphanage : Orphanage){
        return {
            ...orphanage,
            images : imagesView.renderMany(orphanage.images)
        }
    },
    renderMany(orphanages: Orphanage[]){
        return orphanages.map(orphanage => this.render(orphanage));
    }
}