import React from 'react'
import { IItems } from '../../../models/IItems'
import { IItemsNetworking } from '../../../models/IItemsNetworking';
import ModalItemsDetails from '../modals/ModalItemsDetails';
import ModalItemsForm from '../modals/ModalItemsForm';
import ModalSeguimientoItem from '../modals/ModalSeguimientoItem';

interface ItemsListProps {
    invetario: IItems[] | IItemsNetworking[]  | null;
    tipoItem: 'equipos' | 'dispositivos-red' | null;
    idSede: number | null;
}

const ItemsList: React.FC<ItemsListProps> = ({
    invetario,
    tipoItem,
    idSede
}) => {

  const [ selected, setSelected ] = React.useState<IItems | IItemsNetworking | null>(null);

  const handleViewDetails = (item: IItems | IItemsNetworking) => {
    setSelected(item);
  }

  const closeModal = () => {
    setSelected(null);
  }

  return (
    <>
      <h2>
        Inventario de {tipoItem}
      </h2>

      <ModalItemsForm
        idSede={idSede}
        tipoItem={tipoItem}
        items={null}
        idItem={null}
      />

      <ul>
        {invetario?.map((item) => (
            <li key={item.id}>
                {tipoItem === 'equipos' ? (
                    <>
                    <p>{(item as IItems).name}</p>
                    <button 
                      onClick={() => handleViewDetails(item)}
                      className="btn btn-primary"
                    >
                      ver mas detalles
                    </button>

                    <ModalItemsForm
                      idSede={null}
                      tipoItem={tipoItem}
                      items={item as IItems}
                      idItem={(item as IItems).id}
                    />

                    <ModalSeguimientoItem
                      id={(item as IItems).id}
                      tipoItem={tipoItem}
                    />
                  
                    </>
                ) : (
                    <>
                    <p>{(item as IItemsNetworking).name}</p>
                    <button 
                      onClick={() => handleViewDetails(item)}
                      className="btn btn-primary"
                    >
                      ver mas detalles
                    </button>

                    <ModalItemsForm
                      idSede={null}
                      tipoItem={tipoItem}
                      items={item as IItemsNetworking}
                      idItem={(item as IItemsNetworking).id}
                    />

                    <ModalSeguimientoItem
                      id={(item as IItemsNetworking).id}
                      tipoItem={tipoItem}
                    />

                    </>
                )}
            </li>
        ))}
      </ul>
      {selected && (
        <ModalItemsDetails  item={selected} onClose={closeModal} />
      )}
    </>
  )
}

export default ItemsList
