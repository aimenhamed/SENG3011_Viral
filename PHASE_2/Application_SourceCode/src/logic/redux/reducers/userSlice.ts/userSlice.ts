import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HTTPError } from "ky";
import { Flight } from "src/interfaces/ViralInterface";
import {
  getFlightInfo,
  FlightRes,
} from "src/logic/functions/getFlightInfo.function";
import { RootState } from "../../store";