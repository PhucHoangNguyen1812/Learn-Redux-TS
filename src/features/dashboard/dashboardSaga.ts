import cityApi from "../../api/cityApi";
import loverApi from "../../api/loverApi";
import {City, ListResponse ,Lover} from '../../models';
import {all, call, put, takeLatest } from 'redux-saga/effects';
import { dashboardActions, RankingByCity } from "./dashboardSlice";

function* fetchStatistics() {
    const responseList: Array<ListResponse<Lover>> = yield all([
        call(loverApi.getAll, {_page: 1, _limit: 1, gender: 'male'}),
        call(loverApi.getAll, {_page: 1, _limit: 1, gender: 'female'}),
        call(loverApi.getAll, {_page: 1, _limit: 1, mark_gte: 8}),
        call(loverApi.getAll, {_page: 1, _limit: 1, mark_lte: 5}),
    ]);

    const statisticList = responseList.map((x) =>  x.pagination._totalRows);
    const [maleCount , femaleCount, highMarkCount, lowMarkCount] = statisticList;
    yield put (
        dashboardActions.setStatistics({maleCount, femaleCount, highMarkCount, lowMarkCount})
    );

}

function* fetchHighestLoverList() {
    const {data}: ListResponse<Lover> = yield call(loverApi.getAll, {
        _page: 1,
        _limit: 5, 
        _sort: 'mark',
        _order:'desc',
    });

    yield put (dashboardActions.setHighestLoverList(data));
}

function* fetchLowestLoverList() {
    const {data}: ListResponse<Lover> = yield call(loverApi.getAll, {
        _page: 1,
        _limit: 5, 
        _sort: 'mark',
        _order:'asc',
    });

    yield put (dashboardActions.setLowestLoverList(data));
}

function* fetchRankingByCityList() {
    const {data: cityList}: ListResponse<City> = yield call(cityApi.getAll);

    const callList = cityList.map((x) => call(loverApi.getAll,{
        _page: 1,
        _limit: 5,
        _sort:'mark',
        _order:'desc',
        city: x.code,
        })
    );

    const responseList: Array<ListResponse<Lover>> = yield all(callList);
    const rankingByCityList: Array<RankingByCity> = responseList.map((x,idx) => ({
        cityId: cityList[idx].code,
        cityName: cityList[idx].name,
        rankingList: x.data,
    }));

    yield put (dashboardActions.setRankingByCityList(rankingByCityList));
}

function* fetchDashboardData() {
    try {
        yield all ([
            call(fetchStatistics),
            call(fetchHighestLoverList),
            call(fetchLowestLoverList),
            call(fetchRankingByCityList),
        ]);

        yield put(dashboardActions.fetchDataSuccess());
    } catch (error) {
        console.log('Lỗi đến từ data');
        yield put(dashboardActions.fetchDataFailed());
    }
}

export default function* dashboardSaga() {
    yield takeLatest(dashboardActions.fetchData.type, fetchDashboardData);
}
