import './GameMarket.scss';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IconVillager from '../../../../../assets/images/icon_villager.jpeg'
import IconWagon from '../../../../../assets/images/icon_wagon.jpeg'
import { MarketItem } from '../../../../model/MarketItem';
import { ResourceType } from '../../../../enum/ResourceType';
import { userAction } from '../../../../store/slicer/UserActionSlicer';
import GameMarketItem from '../../../components/game/game-market-item/GameMarketItem';
import { UserAction } from '../../../../enum/UserAction';

function GameMarket() 
{
  const dispatch = useDispatch();
  const items:Array<MarketItem> = [
    new MarketItem
    (
      {
        name: "Villager", 
        desc: "+0.1f", 
        icon: IconVillager, 
        price: 
        [
          {
            resource: ResourceType.FOOD,
            value: 60
          }
        ]
      }),
    new MarketItem
    (
      {
        name: "Wagon", 
        desc: "+0.5f", 
        icon: IconWagon, 
        price: 
        [
          {
            resource: ResourceType.FOOD,
            value: 200
          },
          {
            resource: ResourceType.WOOD,
            value: 80
        },            
        ]
      }
    )
  ]

  const onBuyItem = (item:MarketItem) =>
  {
    dispatch( userAction({
      action: UserAction.BUY_ITEM,
      value: item
    }) )
  }

  const renderMarketItems = () => {
    let retValue:Array<any> = [];
    
    items.forEach( (element, index) =>
    {
      retValue.push
      (
        <GameMarketItem key={`market-item-${index}`}  item={element} onBuy={onBuyItem}/>
      );
    } )

    return retValue;
  }
  
  return (
    <div className="GAME-MARKET"> 
        <div className="GAME-MARKET-TITLE">
            Market
        </div>
        <div className="GAME-MARKET-CONTENT">
            {renderMarketItems()}
        </div>       
    </div>
  );
}

export default GameMarket;
