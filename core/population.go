package main

import (
	"net/http"
	"io/ioutil"
	"encoding/json"
	"fmt"
	"log"
    "gopkg.in/mgo.v2/bson"
    "github.com/gaupoit/lib"
    "github.com/robfig/cron"
)

var (
	populationIoUrl = "http://api.population.io:80/1.0/"
	dbUri = "mongodb://localhost"
	db = "ivl"
	collection = "population"
)

type Population struct {
	Date string
	Data float64
}

func main() {
	c := cron.New()
	c.AddFunc("@daily", func() {
		country := "World"
		year := "today-and-tomorrow"
		result := getPopulation(country, year)
		for _, value := range result {
			insert(value)
		}	
	})
	c.Start()
	select {}
}

func insert(population Population) {
	session := lib.ConnectDb(dbUri)
	defer session.Close()
	
	c := session.DB(db).C(collection)
	err := c.Insert(population)

	if err != nil {
		log.Fatal(err)
	}

	result := Population{}
	err = c.Find(bson.M{"date": population.Date}).One(&result)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("World Population of %s: %d\n", result.Date, uint(result.Data))
}

func getPopulation(country string, year string) []Population {
	result := make([]Population, 0)
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
				var pop Population
				pop.Date = v["date"].(string)
				pop.Data = v["population"].(float64)
				result = append(result, pop)
			}
		} else {
			log.Fatal(err)
		}
	} else {
		log.Fatal(err)
	}

	return result
}


