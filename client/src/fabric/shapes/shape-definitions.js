
// export const shapesDefinitions = {
//     rectangle: {
//         type: 'rect',
//         label: 'Rectangle',
//         defaultProps: {
//             // Fixed: Rectangle should have width/height, not radius
//             width: 100,
//             height: 60,
//             fill: '#000000',  // Changed to blue for better visibility
//         },
//         thumbnail: (fabric, canvas) => {
//             const { Rect } = fabric;
//             const rect = new Rect({
//                 left: 15,
//                 top: 25,
//                 width: 70,
//                 height: 50,
//                 fill: '#000000'
//             });
//             canvas.add(rect);
//         },
//     },
//     circle: {
//         type: 'circle',
//         label: 'Circle',
//         defaultProps: {
//             radius: 50,
//             fill: '#000000',  
//         },
//         thumbnail: (fabric, canvas) => {
//             const { Circle } = fabric;
//             const circle = new Circle({
//                 left: 20,
//                 top: 20,
//                 radius: 30,
//                 fill: '#000000'
//             });
//             canvas.add(circle);
//         },
//     },
//     square: {
//         type: 'rect',
//         label: 'square',
//         defaultProps: {
//             width: 80,
//             height: 80,
//             fill: '#000000',  
//         },
//         thumbnail: (fabric, canvas) => {
//             const { Rect } = fabric;
//             const square = new Rect({
//                 left: 20,
//                 top: 20,
//                 width:60,
//                 height:60,
//                 fill: '#000000'
//             });
//             canvas.add(square);
//         },
//     },
//     triangle: {
//         type: 'triangle',
//         label: 'Triangle',
//         defaultProps: {
//             width: 80,
//             height: 80,
//             fill: '#000000',  
//         },
//         thumbnail: (fabric, canvas) => {
//             const { Triangle } = fabric;
//             const triangle = new Triangle({
//                 left: 20,
//                 top: 20,
//                 width:60,
//                 height:60,
//                 fill: '#000000'
//             });
//             canvas.add(triangle);
//         },
//     },
//     ellipse: {
//         type: 'ellipse',
//         label: 'Ellipse',
//         defaultProps: {
//             rx:60,
//             ry:30,
//             fill: '#000000',  
//         },
//         thumbnail: (fabric, canvas) => {
//             const { Ellipse } = fabric;
//             const ellipse = new Ellipse({
//                 left: 20,
//                 top: 20,
//                 rx:35,
//                 ry:18,
//                 fill: '#000000'
//             });
//             canvas.add(ellipse);
//         },
//     },
//     line: {
//         type: 'line',
//         label: 'Line',
//         defaultProps: {
//            x1:50,
//            y1:50,
//            x2:200,
//            y2:50,
//            fill: '#000000',  
//            stroke:5
//         },
//         thumbnail: (fabric, canvas) => {
//             const { Line } = fabric;
//             const line = new Line([15,50,85,50],{
//                 stroke:'#000000',
//                 strokeWidth: 5
//             });
//             canvas.add(line);
//         },
//     },
//     star: {
//         type: 'polygon',
//         label: 'Star',
//         defaultProps: {
//            fill: '#000000',  
//            points:[]
//         },
//         thumbnail: (fabric, canvas) => {
//             const { Poligon } = fabric;
           

//             const starPoints = [];
//             const outerRadius = 30
//             const innerRadius = 15
//             const center = {x:50,y:50};
//             const points = 5;

//            for(let i = 0; i < points*2 ; i++){
//             const radius = i%2 === 0 ? outerRadius:innerRadius;
//             const angle = (i*Math.PI)/points;
//             starPoints.push({
//                 x:center.x+radius+Math.cos(angle),
//                 y:center.y+radius+Math.sin(angle),
//             })
//            }
//             const polygon = new Poligon(starPoints,{
//                 fill: '#000000'
//             });
//             canvas.add(polygon);
//         },
//     },
//        arrow: {
//         type: 'path',
//         label: 'Arrow',
//         defaultProps: {
//            path:'M 20,40 L 150,20 L 150,80 L 150,60 L 20,60 z',
//            fill: '#000000',  
//         },
//         thumbnail: (fabric, canvas) => {
//             const { Path } = fabric;
//             const arrowPath = 'M 10,45 L 65,30 L 90,50 65,70 L 65,55 L 10,55 z';
//             const arrow = new Path(arrowPath,{
//                 fill:'#000000',
//             });
//             canvas.add(arrow);
//         },
//     },
//     pentagon: {
//         type: 'polygon',
//         label: 'Pentagon',
//         defaultProps: {
//            fill: '#000000',  
//            points:[]
//         },
//         thumbnail: (fabric, canvas) => {
//             const { Polygon } = fabric;
           

//             const poligonPoints = [];
//             const radius = 30
//             const center = {x:50,y:50};
//             const sides = 5;

//            for(let i = 0; i < sides*2 ; i++){
//             const angle = (i*2*Math.PI)/sides-Math.PI/2;
//             poligonPoints.push({
//                 x:center.x+radius+Math.cos(angle),
//                 y:center.y+radius+Math.sin(angle),
//             })
//            }
//             const polygon = new Polygon(poligonPoints,{
//                 fill: '#000000'
//             });
//             canvas.add(polygon);
//         },
//     },
//     hexagon: {
//     type: 'polygon',
//     label: 'Hexagon',
//     defaultProps: {
//         fill: '#f39c12',
//         stroke: '#e67e22',
//         strokeWidth: 1,
//         // Pre-calculated hexagon points for default props
//         points: [
//             {x: 60, y: 20},
//             {x: 90, y: 40},
//             {x: 90, y: 70},
//             {x: 60, y: 90},
//             {x: 30, y: 70},
//             {x: 30, y: 40}
//         ],
//         left: 0,
//         top: 0
//     },
//     thumbnail: (fabric, canvas) => {
//         const { Polygon } = fabric;

//         const hexagonPoints = [];
//         const radius = 25;  // Fixed: Reduced radius for thumbnail
//         const center = {x: 40, y: 40};  // Fixed: Centered in thumbnail
//         const sides = 6;

//         // Fixed: Loop should be i < sides, not i < sides*2
//         for(let i = 0; i < sides; i++){
//             const angle = (i * 2 * Math.PI) / sides - Math.PI/2; // Fixed: Start from top
//             hexagonPoints.push({
//                 x: center.x + radius * Math.cos(angle),  // Fixed: Remove extra radius
//                 y: center.y + radius * Math.sin(angle),  // Fixed: Remove extra radius
//             });
//         }

//         const hexagon = new Polygon(hexagonPoints, {
//             fill: '#f39c12',
//             stroke: '#e67e22',
//             strokeWidth: 1,
//             left: 15,
//             top: 15
//         });
        
//         canvas.add(hexagon);
//     },
// },
//     //  hexagon: {
//     //     type: 'polygon',
//     //     label: 'Hexagon',
//     //     defaultProps: {
//     //        fill: '#000000',  
//     //        points:[]
//     //     },
//     //     thumbnail: (fabric, canvas) => {
//     //         const { Polygon } = fabric;

//     //         const hexagonPoints = [];
//     //         const radius = 30
//     //         const center = {x:50,y:50};
//     //         const sides = 6;

//     //        for(let i = 0; i < sides*2 ; i++){
//     //         const angle = (i*2*Math.PI)/sides;
//     //         hexagonPoints.push({
//     //             x:center.x+radius+Math.cos(angle),
//     //             y:center.y+radius+Math.sin(angle),
//     //         })
//     //        }
//     //         const hexagon = new Polygon(hexagonPoints,{
//     //             fill: '#000000'
//     //         });
//     //         canvas.add(hexagon);
//     //     },
//     // },
//        octagon: {
//         type: 'polygon',
//         label: 'Octagon',
//         defaultProps: {
//            fill: '#000000',  
//            points:[]
//         },
//         thumbnail: (fabric, canvas) => {
//             const { Polygon } = fabric;

//             const octagonPoints = [];
//             const radius = 30
//             const center = {x:50,y:50};
//             const sides = 8;

//            for(let i = 0; i < sides*2 ; i++){
//             const angle = (i*2*Math.PI)/sides;
//             octagonPoints.push({
//                 x:center.x+radius+Math.cos(angle),
//                 y:center.y+radius+Math.sin(angle),
//             })
//            }
//             const octagon = new Polygon(octagonPoints,{
//                 fill: '#000000'
//             });
//             canvas.add(octagon);
//         },
//     },
//     //  octagon: {
//     //     type: 'polygon',
//     //     label: 'Octagon',
//     //     defaultProps: {
//     //        fill: '#000000',  
//     //        points:[]
//     //     },
//     //     thumbnail: (fabric, canvas) => {
//     //         const { Polygon } = fabric;

//     //         const octagonPoints = [];
//     //         const radius = 30
//     //         const center = {x:50,y:50};
//     //         const sides = 8;

//     //        for(let i = 0; i < sides*2 ; i++){
//     //         const angle = (i*2*Math.PI)/sides;
//     //         octagonPoints.push({
//     //             x:center.x+radius+Math.cos(angle),
//     //             y:center.y+radius+Math.sin(angle),
//     //         })
//     //        }
//     //         const octagon = new Polygon(octagonPoints,{
//     //             fill: '#000000'
//     //         });
//     //         canvas.add(octagon);
//     //     },
//     // },
//     //  doubleArrow: {
//     //     type: 'path',
//     //     label: 'Double Arrow',
//     //     defaultProps: {
//     //        path:"M 15,50 L 50,50 L 50,35 L 85,50 L 50,65 L 50,50 L 15,50 M 85,50 L 50,50 ",   
//     //        fill: '#000000',  
//     //     },
//     //     thumbnail: (fabric, canvas) => {
//     //         const { Path } = fabric;
//     //        const doubleArrow = new Path(doubleArrow,{
//     //         fill:'#000000'
//     //        });
//     //         canvas.add(octagon);
//     //     },
//     // },
//     doubleArrow: {
//     type: 'path',
//     label: 'Double Arrow',
//     defaultProps: {
//         path: "M 10,25 L 40,25 L 40,15 L 60,30 L 40,45 L 40,35 L 10,35 Z M 60,30 L 80,15 L 80,25 L 90,25 L 90,35 L 80,35 L 80,45 Z",   
//         fill: '#000000',
//         stroke: '#000000',
//         strokeWidth: 1,
//         left: 0,
//         top: 0,
//         scaleX: 1,
//         scaleY: 1
//     },
//     thumbnail: (fabric, canvas) => {
//         const { Path } = fabric;
//         // Fixed: Use the correct path string and variable names
//         const doubleArrowPath = "M 10,15 L 30,15 L 30,10 L 45,20 L 30,30 L 30,25 L 10,25 Z M 45,20 L 55,10 L 55,15 L 70,15 L 70,25 L 55,25 L 55,30 Z";
        
//         const doubleArrow = new Path(doubleArrowPath, {
//             fill: '#000000',
//             left: 15,
//             top: 20,
//             scaleX: 0.8,
//             scaleY: 0.8
//         });
        
//         // Fixed: Add the correct variable to canvas
//         canvas.add(doubleArrow);
//     },
// },

// // elbowConnector: {
// //         type: 'path',
// //         label: 'Elbow  Connector',
// //         defaultProps: {
// //            path:"M 15,50 L 50,50 L 50,35 L 85,50 L 50,65 L 50,50 L 15,50 M 85,50 L 50,50 ",   
// //            fill: '#000000',
// //            stroke:'#000000',
// //            strokeWidth:5,
// //            fill:''  
// //         },
// //         thumbnail: (fabric, canvas) => {
// //             const { Path } = fabric;
// //            const elbowConnector = new Path(elbowConnector,{
// //             fill:'#000000'
// //            });
// //             canvas.add(elbowConnector);
// //         },
// //     },
// elbowConnector: {
//     type: 'path',
//     label: 'Elbow Connector',
//     defaultProps: {
//         // Fixed: Proper elbow connector path (L-shaped)
//         path: "M 20,20 L 20,50 L 70,50",   
//         fill: 'transparent',  // Fixed: Remove duplicate fill and use transparent for connector lines
//         stroke: '#000000',    // Fixed: Use visible stroke color
//         strokeWidth: 3,       // Fixed: Reasonable stroke width
//         strokeLineCap: 'round',
//         strokeLineJoin: 'round',
//         left: 0,
//         top: 0
//     },
//     thumbnail: (fabric, canvas) => {
//         const { Path } = fabric;
        
//         // Fixed: Use proper path string and variable names
//         const elbowConnectorPath = "M 15,15 L 15,35 L 50,35 L 70,35";
        
//         const elbowConnector = new Path(elbowConnectorPath, {
//             fill: 'transparent',
//             stroke: '#000000',
//             strokeWidth: 2,
//             strokeLineCap: 'round',
//             strokeLineJoin: 'round',
//             left: 15,
//             top: 25
//         });
        
//         // Fixed: Add the correct variable to canvas
//         canvas.add(elbowConnector);
//     },
    
// },
// cross: {
//     type: 'path',
//     label: 'Cross',
//     defaultProps: {
//         // Cross shape path (plus sign)
//         path: "M 40,10 L 60,10 L 60,40 L 90,40 L 90,60 L 60,60 L 60,90 L 40,90 L 40,60 L 10,60 L 10,40 L 40,40 Z",   
//         fill: '#e74c3c',
//         stroke: '#c0392b',
//         strokeWidth: 1,
//         left: 0,
//         top: 0,
//         scaleX: 1,
//         scaleY: 1
//     },
//     thumbnail: (fabric, canvas) => {
//         const { Path } = fabric;
        
//         // Smaller cross for thumbnail
//         const crossPath = "M 35,20 L 45,20 L 45,35 L 60,35 L 60,45 L 45,45 L 45,60 L 35,60 L 35,45 L 20,45 L 20,35 L 35,35 Z";
        
//         const cross = new Path(crossPath, {
//             fill: '#e74c3c',
//             stroke: '#c0392b',
//             strokeWidth: 1,
//             left: 20,
//             top: 20,
//             scaleX: 0.6,
//             scaleY: 0.6
//         });
        
//         canvas.add(cross);
//     },
// },
// heart: {
//     type: 'path',
//     label: 'Heart',
//     defaultProps: {
//         // Heart shape path using curves
//         path: "M 50,25 C 50,15 35,10 25,25 C 15,10 0,15 0,25 C 0,40 25,60 50,85 C 75,60 100,40 100,25 C 100,15 85,10 75,25 C 65,10 50,15 50,25 Z",   
//         fill: '#e74c3c',
//         stroke: '#c0392b',
//         strokeWidth: 1,
//         left: 0,
//         top: 0,
//         scaleX: 1,
//         scaleY: 1
//     },
//     thumbnail: (fabric, canvas) => {
//         const { Path } = fabric;
        
//         // Smaller heart for thumbnail
//         const heartPath = "M 40,30 C 40,22 30,18 22,30 C 14,18 4,22 4,30 C 4,42 22,58 40,75 C 58,58 76,42 76,30 C 76,22 66,18 58,30 C 50,18 40,22 40,30 Z";
        
//         const heart = new Path(heartPath, {
//             fill: '#e74c3c',
//             stroke: '#c0392b',
//             strokeWidth: 1,
//             left: 12,
//             top: 12,
//             scaleX: 0.7,
//             scaleY: 0.7
//         });
        
//         canvas.add(heart);
//     },
// }
// };

// export const shapeTypes = [
//     'rectangle', 'circle','square','pentagon','octagon','doubleArrow','heart',
//     'elbowConnector','cross','triangle','ellipse','line','arrow',
// ];


export const shapesDefinitions = {
    // Row 1: Rectangle, Square, Circle
    rectangle: {
        type: 'rect',
        label: 'Rectangle',
        defaultProps: {
            width: 120,
            height: 80,
            fill: '#000000',
            stroke: '#333333',
            strokeWidth: 1
        },
        thumbnail: (fabric, canvas) => {
            const { Rect } = fabric;
            const rect = new Rect({
                left: 20,
                top: 30,
                width: 60,
                height: 40,
                fill: '#000000'
            });
            canvas.add(rect);
        },
    },

    square: {
        type: 'rect',
        label: 'Square',
        defaultProps: {
            width: 100,
            height: 100,
            fill: '#000000',
            stroke: '#333333',
            strokeWidth: 1
        },
        thumbnail: (fabric, canvas) => {
            const { Rect } = fabric;
            const square = new Rect({
                left: 25,
                top: 25,
                width: 50,
                height: 50,
                fill: '#000000'
            });
            canvas.add(square);
        },
    },

    circle: {
        type: 'circle',
        label: 'Circle',
        defaultProps: {
            radius: 50,
            fill: '#000000',
            stroke: '#333333',
            strokeWidth: 1
        },
        thumbnail: (fabric, canvas) => {
            const { Circle } = fabric;
            const circle = new Circle({
                left: 25,
                top: 25,
                radius: 25,
                fill: '#000000'
            });
            canvas.add(circle);
        },
    },

    // Row 2: Triangle, Oval, Line
    triangle: {
        type: 'polygon',
        label: 'Triangle',
        defaultProps: {
            fill: '#000000',
            stroke: '#333333',
            strokeWidth: 1,
            points: [
                {x: 50, y: 10},
                {x: 90, y: 80},
                {x: 10, y: 80}
            ]
        },
        thumbnail: (fabric, canvas) => {
            const { Polygon } = fabric;
            const trianglePoints = [
                {x: 50, y: 20},
                {x: 75, y: 65},
                {x: 25, y: 65}
            ];
            const triangle = new Polygon(trianglePoints, {
                fill: '#000000',
                left: 15,
                top: 15
            });
            canvas.add(triangle);
        },
    },

    oval: {
        type: 'ellipse',
        label: 'Oval',
        defaultProps: {
            rx: 60,
            ry: 35,
            fill: '#000000',
            stroke: '#333333',
            strokeWidth: 1
        },
        thumbnail: (fabric, canvas) => {
            const { Ellipse } = fabric;
            const oval = new Ellipse({
                left: 20,
                top: 32,
                rx: 30,
                ry: 18,
                fill: '#000000'
            });
            canvas.add(oval);
        },
    },

    line: {
        type: 'line',
        label: 'Line',
        defaultProps: {
            x1: 20,
            y1: 50,
            x2: 80,
            y2: 50,
            stroke: '#000000',
            strokeWidth: 4,
            strokeLineCap: 'round'
        },
        thumbnail: (fabric, canvas) => {
            const { Line } = fabric;
            const line = new Line([20, 50, 80, 50], {
                stroke: '#000000',
                strokeWidth: 3,
                strokeLineCap: 'round'
            });
            canvas.add(line);
        },
    },

    // Row 3: Star, Arrow, Pentagon
    star: {
        type: 'polygon',
        label: 'Star',
        defaultProps: {
            fill: '#000000',
            stroke: '#333333',
            strokeWidth: 1,
            points: [
                {x: 50, y: 10}, {x: 58, y: 35}, {x: 85, y: 35}, {x: 65, y: 53},
                {x: 73, y: 78}, {x: 50, y: 63}, {x: 27, y: 78}, {x: 35, y: 53},
                {x: 15, y: 35}, {x: 42, y: 35}
            ]
        },
        thumbnail: (fabric, canvas) => {
            const { Polygon } = fabric;
            const starPoints = [
                {x: 50, y: 15}, {x: 55, y: 35}, {x: 75, y: 35}, {x: 60, y: 48},
                {x: 65, y: 68}, {x: 50, y: 58}, {x: 35, y: 68}, {x: 40, y: 48},
                {x: 25, y: 35}, {x: 45, y: 35}
            ];
            const star = new Polygon(starPoints, {
                fill: '#000000',
                left: 15,
                top: 15,
                scaleX: 0.8,
                scaleY: 0.8
            });
            canvas.add(star);
        },
    },

    arrow: {
        type: 'polygon',
        label: 'Arrow',
        defaultProps: {
            fill: '#000000',
            stroke: '#333333',
            strokeWidth: 1,
            points: [
                {x: 10, y: 35}, {x: 60, y: 35}, {x: 60, y: 20},
                {x: 90, y: 50}, {x: 60, y: 80}, {x: 60, y: 65}, {x: 10, y: 65}
            ]
        },
        thumbnail: (fabric, canvas) => {
            const { Polygon } = fabric;
            const arrowPoints = [
                {x: 15, y: 40}, {x: 50, y: 40}, {x: 50, y: 28},
                {x: 75, y: 50}, {x: 50, y: 72}, {x: 50, y: 60}, {x: 15, y: 60}
            ];
            const arrow = new Polygon(arrowPoints, {
                fill: '#000000',
                left: 12,
                top: 15,
                scaleX: 0.8,
                scaleY: 0.8
            });
            canvas.add(arrow);
        },
    },

    pentagon: {
        type: 'polygon',
        label: 'Pentagon',
        defaultProps: {
            fill: '#000000',
            stroke: '#333333',
            strokeWidth: 1,
            points: [
                {x: 50, y: 15}, {x: 85, y: 40}, {x: 70, y: 80},
                {x: 30, y: 80}, {x: 15, y: 40}
            ]
        },
        thumbnail: (fabric, canvas) => {
            const { Polygon } = fabric;
            const pentagonPoints = [
                {x: 50, y: 20}, {x: 75, y: 38}, {x: 68, y: 70},
                {x: 32, y: 70}, {x: 25, y: 38}
            ];
            const pentagon = new Polygon(pentagonPoints, {
                fill: '#000000',
                left: 15,
                top: 15,
                scaleX: 0.8,
                scaleY: 0.8
            });
            canvas.add(pentagon);
        },
    },

    // Row 4: Hexagon, Octagon, Diamond
    hexagon: {
        type: 'polygon',
        label: 'Hexagon',
        defaultProps: {
            fill: '#000000',
            stroke: '#333333',
            strokeWidth: 1,
            points: [
                {x: 60, y: 20}, {x: 90, y: 40}, {x: 90, y: 70},
                {x: 60, y: 90}, {x: 30, y: 70}, {x: 30, y: 40}
            ]
        },
        thumbnail: (fabric, canvas) => {
            const { Polygon } = fabric;
            const hexagonPoints = [
                {x: 50, y: 22}, {x: 70, y: 35}, {x: 70, y: 58},
                {x: 50, y: 72}, {x: 30, y: 58}, {x: 30, y: 35}
            ];
            const hexagon = new Polygon(hexagonPoints, {
                fill: '#000000',
                left: 15,
                top: 15,
                scaleX: 0.8,
                scaleY: 0.8
            });
            canvas.add(hexagon);
        },
    },

    octagon: {
        type: 'polygon',
        label: 'Octagon',
        defaultProps: {
            fill: '#000000',
            stroke: '#333333',
            strokeWidth: 1,
            points: [
                {x: 50, y: 20}, {x: 80, y: 20}, {x: 100, y: 50},
                {x: 100, y: 80}, {x: 80, y: 100}, {x: 50, y: 100},
                {x: 20, y: 80}, {x: 20, y: 50}
            ]
        },
        thumbnail: (fabric, canvas) => {
            const { Polygon } = fabric;
            const octagonPoints = [
                {x: 45, y: 22}, {x: 65, y: 22}, {x: 78, y: 35},
                {x: 78, y: 55}, {x: 65, y: 68}, {x: 45, y: 68},
                {x: 32, y: 55}, {x: 32, y: 35}
            ];
            const octagon = new Polygon(octagonPoints, {
                fill: '#000000',
                left: 15,
                top: 15,
                scaleX: 0.8,
                scaleY: 0.8
            });
            canvas.add(octagon);
        },
    },

    diamond: {
        type: 'polygon',
        label: 'Diamond',
        defaultProps: {
            fill: '#000000',
            stroke: '#333333',
            strokeWidth: 1,
            points: [
                {x: 50, y: 10}, {x: 85, y: 50},
                {x: 50, y: 90}, {x: 15, y: 50}
            ]
        },
        thumbnail: (fabric, canvas) => {
            const { Polygon } = fabric;
            const diamondPoints = [
                {x: 50, y: 20}, {x: 75, y: 50},
                {x: 50, y: 80}, {x: 25, y: 50}
            ];
            const diamond = new Polygon(diamondPoints, {
                fill: '#000000',
                left: 15,
                top: 15,
                scaleX: 0.8,
                scaleY: 0.8
            });
            canvas.add(diamond);
        },
    },

    // Row 5: L-Shape, Heart, Cross
    lShape: {
        type: 'polygon',
        label: 'L-Shape',
        defaultProps: {
            fill: '#000000',
            stroke: '#333333',
            strokeWidth: 1,
            points: [
                {x: 20, y: 20}, {x: 40, y: 20}, {x: 40, y: 60},
                {x: 80, y: 60}, {x: 80, y: 80}, {x: 20, y: 80}
            ]
        },
        thumbnail: (fabric, canvas) => {
            const { Polygon } = fabric;
            const lShapePoints = [
                {x: 25, y: 25}, {x: 40, y: 25}, {x: 40, y: 55},
                {x: 70, y: 55}, {x: 70, y: 70}, {x: 25, y: 70}
            ];
            const lShape = new Polygon(lShapePoints, {
                fill: '#000000',
                left: 15,
                top: 15
            });
            canvas.add(lShape);
        },
    },

    heart: {
        type: 'path',
        label: 'Heart',
        defaultProps: {
            path: "M 50,25 C 50,15 35,10 25,25 C 15,10 0,15 0,25 C 0,40 25,60 50,85 C 75,60 100,40 100,25 C 100,15 85,10 75,25 C 65,10 50,15 50,25 Z",
            fill: '#000000',
            stroke: '#333333',
            strokeWidth: 1
        },
        thumbnail: (fabric, canvas) => {
            const { Path } = fabric;
            const heartPath = "M 50,30 C 50,22 38,18 30,30 C 22,18 10,22 10,30 C 10,42 30,58 50,75 C 70,58 90,42 90,30 C 90,22 78,18 70,30 C 62,18 50,22 50,30 Z";
            const heart = new Path(heartPath, {
                fill: '#000000',
                left: 5,
                top: 15,
                scaleX: 0.8,
                scaleY: 0.8
            });
            canvas.add(heart);
        },
    },

    cross: {
        type: 'polygon',
        label: 'Cross',
        defaultProps: {
            fill: '#000000',
            stroke: '#333333',
            strokeWidth: 1,
            points: [
                {x: 40, y: 10}, {x: 60, y: 10}, {x: 60, y: 40},
                {x: 90, y: 40}, {x: 90, y: 60}, {x: 60, y: 60},
                {x: 60, y: 90}, {x: 40, y: 90}, {x: 40, y: 60},
                {x: 10, y: 60}, {x: 10, y: 40}, {x: 40, y: 40}
            ]
        },
        thumbnail: (fabric, canvas) => {
            const { Polygon } = fabric;
            const crossPoints = [
                {x: 42, y: 20}, {x: 58, y: 20}, {x: 58, y: 42},
                {x: 80, y: 42}, {x: 80, y: 58}, {x: 58, y: 58},
                {x: 58, y: 80}, {x: 42, y: 80}, {x: 42, y: 58},
                {x: 20, y: 58}, {x: 20, y: 42}, {x: 42, y: 42}
            ];
            const cross = new Polygon(crossPoints, {
                fill: '#000000',
                left: 10,
                top: 10,
                scaleX: 0.8,
                scaleY: 0.8
            });
            canvas.add(cross);
        },
    }
};

export const shapeTypes = [
    'rectangle', 'square', 'circle',
    'triangle', 'oval', 'line',
    'star', 'arrow', 'pentagon',
    'hexagon', 'octagon', 'diamond',
    'lShape', 'heart', 'cross'
];