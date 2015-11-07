package main

import (
	"net/http"
	"io/ioutil"
	"encoding/json"
	"fmt"
)

var (
	populationIoUrl = "http://api.population.io:80/1.0/"
)

type population struct {
	Date string
	Population float64
}

func main() {
	fmt.Println(populationIo)
	country := "World"
	year := "today-and-tomorrow"
	getPopulation(country, year)
}

func getPopulation(country string, year string) {
	url := fmt.Sprintf("%s/population/%s/%s", populationIoUrl, country, year)
	fmt.Printf("Getting data from: %s\n", url)
	resp, err := http.Get(url)
	if err == nil {
		body, err := ioutil.ReadAll(resp.Body)
		var data map[string][]map[string]interface{}
		json.Unmarshal(body, &data)
		if err == nil {
			total_population := data["total_population"]
			for _, v := range total_population {
				var pop population
				pop.Date = v["date"].(string)
				pop.Population = v["population"].(float64)
				fmt.Println(pop)
			}
		} else {
			fmt.Println(err)
		}
	} else {
		fmt.Println(err)
	}
	
}


