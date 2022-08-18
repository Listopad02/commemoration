import {Input} from "@mui/material";
import React, {useState,useEffect,useRef} from 'react'
import { withYMaps } from 'react-yandex-maps'
import { setInputAddr } from "./cartSlice";
import { useAppSelector, useAppDispatch } from "../../redux/hooks.ts";

function CartAdressAutoComlete({setAddress, setZone}) {
    const dispatch = useAppDispatch()

    useEffect(()=>{

        function loadScript(src, callback) {
            let script = document.createElement('script');
            script.src = src;
          
            script.onload = () => callback(script);
          
            document.head.append(script);
          }

        loadScript("https://api-maps.yandex.ru/2.1?apikey=b1271538-165d-4c34-a409-583158b0f94b&lang=ru_RU", function() {            
            ymaps.ready(init);
          });        

            function init() {
                const map = document.getElementById('map');
                if(map) map.innerHTML="";           

                const myMap = new ymaps.Map("map", {
                    center: [55.758493, 37.839271], zoom: 9,
                }),

                zona1 = new ymaps.Polygon([
                    [[55.799348, 37.937095],
                     [55.724800, 37.932081],
                     [55.718512, 37.883466],
                     [55.705361, 37.881947],
                     [55.709231, 37.838998],
                     [55.743776, 37.752128],
                     [55.757583, 37.747397],
                     [55.798119, 37.749469],
                     [55.810710, 37.829094]]
                ],
                {
                    hintContent: "Многоугольник"
                }, {
                    fillColor: '#53B6FE',
                    strokeColor: '#42aaff',
                    opacity: 0.6,
                    strokeWidth: 3,
                    strokeStyle: 'solid',
                }),
                  zona2 = new ymaps.Polygon([
                    [
                        [55.908434, 37.540855],
                        [55.950682, 37.821415],
                        [55.928470, 37.996498],
                        [55.876176, 38.212483],
                        [55.823875, 38.202571],
                        [55.727998, 38.263790],
                        [55.597478, 38.119803],
                        [55.547346, 37.773830],
                        [55.545045, 37.704022],
                        [55.568091, 37.666216],
                    ],
                    [
                        [55.799348, 37.937095],
                        [55.724800, 37.932081],
                        [55.718512, 37.883466],
                        [55.705361, 37.881947],
                        [55.709231, 37.838998],
                        [55.743776, 37.752128],
                        [55.757583, 37.747397],
                        [55.798119, 37.749469],
                        [55.810710, 37.829094]
                    ]
                ],
                {
                    hintContent: "Многоугольник"
                }, {
                    fillColor: '#7FFE53',
                        strokeColor: '#008000',
                        opacity: 0.5,
                        strokeWidth: 3,
                        strokeStyle: 'solid',
                }), 
                zona3 = new ymaps.Polygon([
                    [
                        [55.666808, 37.876809],
                        [55.702947, 37.792329],
                        [55.722609, 37.698867],
                        [55.701363, 37.624883],
                        [55.750249, 37.617829],
                        [55.795320, 37.633630],
                        [55.886220, 37.716289],
                        [55.903861, 37.754294],
                        [55.910780, 37.935957],
                        [55.885480, 38.000912],
                        [55.753236, 38.099209],
                        [55.697305, 38.036273],
                    ],
                    [
                        [55.908434, 37.540855],
                        [55.950682, 37.821415],
                        [55.928470, 37.996498],
                        [55.876176, 38.212483],
                        [55.823875, 38.202571],
                        [55.727998, 38.263790],
                        [55.597478, 38.119803],
                        [55.547346, 37.773830],
                        [55.545045, 37.704022],
                        [55.568091, 37.666216],
                    ]
                ],
                {
                    hintContent: "Многоугольник"
                }, {
                    fillColor: '#FDBD5A',
                        strokeColor: '#ffff00',
                        opacity: 0.4,
                        strokeWidth: 3,
                        strokeStyle: 'solid',
                }),
                zona4 = new ymaps.Polygon([
                        [
                            [56.147572, 37.987843],
                            [56.054191, 38.316427],
                            [55.968580, 38.475876],
                            [55.970603, 38.571633],
                            [55.836978, 38.625136],
                            [55.692030, 38.397370],
                            [55.563641, 38.465817],
                            [55.512179, 38.383398],
                            [55.456739, 38.378265],
                            [55.406437, 38.359085],
                            [55.373473, 38.051975],
                            [55.409819, 37.973554],
                            [55.372826, 37.841433],
                            [55.397741, 37.797419],
                            // [55.467526, 37.817541],
                            // [55.505649, 37.761625],
                            // [55.606667, 37.700730],
                            // [55.614411, 37.579792],
                            [55.660616, 37.505268],
                            [55.775873, 37.399436],
                            [55.851282, 37.411297],
                            [55.923252, 37.454925],
                            [55.955138, 37.550382],
                            [55.958425, 37.639874],
                            [55.980058, 37.735271],
                            [55.989787, 37.870623],
                        ],
                        [
                            [55.908434, 37.540855],
                            [55.950682, 37.821415],
                            [55.928470, 37.996498],
                            [55.876176, 38.212483],
                            [55.823875, 38.202571],
                            [55.727998, 38.263790],
                            [55.597478, 38.119803],
                            [55.547346, 37.773830],
                            [55.545045, 37.704022],
                            [55.568091, 37.666216],
                        ],
                ],
                 {
                    hintContent: "Многоугольник"
                }, {
                    fillColor: '#F27874',
                        strokeColor: '#ff0000',
                        opacity: 0.3,
                        strokeWidth: 3,
                        strokeStyle: 'solid',
                });
                  myMap.geoObjects.add(zona1);
                  myMap.geoObjects.add(zona2);
                  myMap.geoObjects.add(zona3);
                  myMap.geoObjects.add(zona4);
                  myMap.setBounds(zona1.geometry.getBounds());
                  myMap.setBounds(zona2.geometry.getBounds());
                  myMap.setBounds(zona3.geometry.getBounds());
                  myMap.setBounds(zona4.geometry.getBounds());

                  const suggestView = new ymaps.SuggestView('suggest', {results: 10});
                  suggestView.events.add('select', function (event) {seachZone(event.get("item"));});
                  const seachZone = (adr) => {
                    setAddress(adr.value);
                    dispatch(setInputAddr(adr.value))
                    const result = ymaps.geoQuery(ymaps.geocode(adr.value)).applyBoundsToMap(myMap, {checkZoomRange: true});
                    const res5 = result.searchInside(zona1).then(value => {
                        if (!res5._objects.length) {
                            setZone(0)
                        }
                    });
                    const res6 = result.searchInside(zona2).then(value => {
                        if (!res6._objects.length) {
                            setZone(0)
                        }
                    });
                    const res7 = result.searchInside(zona3).then(value => {
                        if (!res7._objects.length) {
                            setZone(0)
                        }
                    });
                    const res8 = result.searchInside(zona4).then(value => {
                        if (!res8._objects.length) {
                            setZone(0)
                        }
                    });
                    const res1 = result.searchInside(zona1).then(value => {
                        if (res1._objects.length) {
                            setZone(1)
                        }
                    });
                    const res2 = result.searchInside(zona2).then(value => {
                        if(res2._objects.length) {
                            setZone(2)
                        }
                    });
                    const res3 = result.searchInside(zona3).then(value => {
                        if(res3._objects.length) {
                            setZone(3)
                        }
                    });
                    const res4 = result.searchInside(zona4).then(value => {
                        if(res4._objects.length) {
                            setZone(4)
                        }
                    });   
                  }
            }
    },[setAddress, setZone]);
    return <></>
}

export default CartAdressAutoComlete;