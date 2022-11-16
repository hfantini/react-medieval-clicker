import './GameMarketItem.scss';

import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import React from 'react';
import { useDispatch } from 'react-redux';

import IconFood from '../../../../../assets/images/icon_food.jpeg';
import IconGold from '../../../../../assets/images/icon_gold.jpeg';
import IconStone from '../../../../../assets/images/icon_stone.jpeg';
import IconWood from '../../../../../assets/images/icon_wood.jpeg';
import { ResourceType } from '../../../../enum/ResourceType';
import { MarketPrice } from '../../../../model/MarketPrice';

function GameMarketItem(props:any) 
{
  const dispatch = useDispatch();

  const renderItemPrice = (price:Array<MarketPrice>) =>
  {
    let retValue:Array<any> = [];

    price.forEach( (element, index) => 
    {
      let image:any = null;

      switch(element.resource)
      {
        case ResourceType.FOOD:
          image = IconFood;
        break;

        case ResourceType.WOOD:
          image = IconWood;
        break;
        
        case ResourceType.GOLD:
          image = IconGold;
        break;
        
        case ResourceType.STONE:
          image = IconStone;
        break;        
      }

      retValue.push
      (
        <div key={`mprice-${index}`} className="GAME-MARKET-ITEM-PRICE-CONTAINER">
          <img src={image}/> <div className="GAME-MARKET-ITEM-PRICE-CONTAINER-VALUE">{element.value}</div>
        </div>
      )
    })

    return retValue;
  }

  const onBuyClick = () => 
  {
    props.onBuy(props.item);
  }

  return (
    <div className="GAME-MARKET-ITEM">
      <div className="GAME-MARKET-ITEM-ICON">
        <img src={props.item.icon} />
      </div>
      <div className="GAME-MARKET-ITEM-MIDDLE">
        <div className="GAME-MARKET-ITEM-TITLE">
          {props.item.name} ({props.item.desc})
        </div>
        <div className="GAME-MARKET-ITEM-PRICE">
          {renderItemPrice(props.item.price)}
        </div>        
      </div>
      <div className="GAME-MARKET-ITEM-OPTIONS" onClick={onBuyClick}>
        <CurrencyExchangeIcon/>
      </div>
    </div>
  );
}

export default GameMarketItem;
