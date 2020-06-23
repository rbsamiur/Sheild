<!--<template>-->
<!--    <div>-->
<!--        <p>{{coordinates.lat}} lattitude, {{coordinates.lng}} longtitude</p>-->
<!--    </div>-->
<!--</template>-->

<!--<script>-->
<!--    export default {-->
<!--        name: "location",-->
<!--        data(){-->
<!--            return{-->
<!--                coordinates:{-->
<!--                    lat:0,-->
<!--                    lng:0-->

<!--                }-->
<!--            }-->
<!--        },-->
<!--        created() {-->
<!--            //get useer location-->
<!--            this.$getLocation({}).then(coordinates =>{-->
<!--                this.coordinates=coordinates;-->
<!--            }).catch(error=>{-->
<!--                alert(error +"\nNeed location access to find nearby users")-->
<!--            })-->
<!--        }-->
<!--    }-->
<!--</script>-->


<template>
    <div id="location">
        <p class="text-xs"> <span class="text-blue-500 font-bold">*</span>Please Select your <span class="text-blue-500 font-bold" >Current location</span> by putting <span class="text-blue-500 font-bold" >Marker</span> in the <span class="text-blue-500 font-bold" >correct location</span>. This location will be counted as <span class="text-blue-500 font-bold" >permanent location</span>, based on which you will be able to find nearby <span class="text-blue-500 font-bold" >helping hands</span>  and <span class="text-blue-500 font-bold" >notification for Help</span>.</p>
        <!--In the following div the HERE Map will render-->
        <div id="mapContainer" style="height:600px;width:100%" ref="hereMap">

        </div>
    </div>
</template>

<script>
    export default {
        name: "location",
        props: {
            center:{}
            // center object { lat: 40.730610, lng: -73.935242 }
        },
        data() {
            return {
                platform: null,
                ui: null,
                map:null,
                markerPos:null,

                apikey: "PBDlhKL5FRcqbNHrM5cpDLyMsofhOFwssXVRMxA6V_k"
                // You can get the API KEY from developer.here.com
            };
        },

        async mounted() {
            // Initialize the platform object:
            const platform = new window.H.service.Platform({
                apikey: this.apikey
            });
            this.platform = platform;
            this.initializeHereMap();

            const service = platform.getSearchService();
            service.reverseGeocode({
                // at: '52.5309,13.3847,150'
                at: this.center.lat+","+this.center.lng
            }, (result) => {
                result.items.forEach((item) => {
                    // Assumption: ui is instantiated
                    // Create an InfoBubble at the returned location with
                    // the address as its contents:
                    this.ui.addBubble(new H.ui.InfoBubble(item.position, {
                        content: item.address.label

                    }));
                });
            }, alert);


        },
        // beforeDestroy() {
        //     this.$store.state.userCoord=this.markerPos;
        //
        //     console.log("now ")
        //     console.log(this.markerPos)
        // },
        methods: {
            initializeHereMap() { // rendering map

                const mapContainer = this.$refs.hereMap;
                const H = window.H;
                // Obtain the default map types from the platform object
                var maptypes = this.platform.createDefaultLayers();

                // Instantiate (and display) a map object:
                var map = new H.Map(mapContainer, maptypes.vector.normal.map, {
                    zoom: 10,
                    center: this.center
                    //center object { lat: 40.730610, lng: -73.935242 }
                });
                this.map=map;
                addEventListener("resize", () => map.getViewPort().resize());

                // add behavior control
                new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

                // add UI
                this.ui= H.ui.UI.createDefault(map, maptypes);
               //editing ui
                let position={lat: this.center.lat,lng: this.center.lng}

                console.log( H.Map)

                console.log( position)
                this.dropMarker(position)

                this.setUpClickListener(this.map)

            },
             setUpClickListener(map) {
                // Attach an event listener to map display
                // obtain the coordinates and display in an alert box

                map.addEventListener('tap', function (evt) {

                    var coord = map.screenToGeo(evt.currentPointer.viewportX,
                        evt.currentPointer.viewportY);
                    let markPos={lat: Math.abs(coord.lat.toFixed(4)) ,lng: Math.abs(coord.lng.toFixed(4))}
                    this.markerPos=markPos
                    console.log(H.map)
                    map.removeObjects(map.getObjects ())
                    map.addObject(new H.map.Marker(this.markerPos))
                    console.log(this.$store)

                });

            },
            dropMarker(position){
                this.map.addObject(new H.map.Marker(position));
            },
        }
    };
</script>
<style scoped>

</style>
