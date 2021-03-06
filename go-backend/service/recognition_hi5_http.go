package service

import (
	"encoding/json"
	"github.com/gorilla/mux"
	logger "github.com/sirupsen/logrus"
	"joshsoftware/peerly/db"
	"net/http"
	"strconv"
)

func createRecognitionHi5Handler(deps Dependencies) http.HandlerFunc {
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		vars := mux.Vars(req)
		recognitionID, err := strconv.Atoi(vars["recognition_id"])
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error recognition_id key is missing")
			rw.WriteHeader(http.StatusBadRequest)
			return
		}

		var recognitionHi5 db.RecognitionHi5
		err = json.NewDecoder(req.Body).Decode(&recognitionHi5)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error Decoding recognitionHi5 data")
			rw.WriteHeader(http.StatusBadRequest)
			return
		}

		currentUser, err := deps.Store.GetUser(req.Context(), recognitionHi5.GivenBy)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error while fetching User")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}

		errorResponse := recognitionHi5.CheckHi5QuotaBalance(currentUser.Hi5QuotaBalance)
		if len(errorResponse) > 0 {
			logger.Error("Insufficient hi5 quota balance for ", currentUser.ID)

			respBytes, err := json.Marshal(errorResponse)
			if err != nil {
				logger.WithField("err", err.Error()).Error("Error marshaling recognitionHi5 data")
				rw.WriteHeader(http.StatusInternalServerError)
				return
			}
			rw.WriteHeader(http.StatusBadRequest)
			rw.Write(respBytes)
			return
		}

		err = deps.Store.CreateRecognitionHi5(req.Context(), recognitionHi5, recognitionID)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error in creating recognition hi5")
			rw.WriteHeader(http.StatusBadRequest)
			return
		}

		rw.WriteHeader(http.StatusCreated)
		return
	})
}
