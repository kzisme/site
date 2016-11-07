---
layout: post
title:  "C# Holiday Hashset"
date:   2016-11-06 22:52:21
categories: jekyll post
---

This is what my exerpt will be when I write something...




{% highlight c# %}
namespace EntitiyFrameworkTest
{
    class Program
    {
        static void Main(string[] args)
        {
            var dt = DateTime.Now;
            int year = dt.Year;

            GetHolidays(year);

            var myYearlyHolidays = GetHolidays(2016);
        }

        private static HashSet<DateTime> GetHolidays(int year)
        {
            HashSet<DateTime> holidays = new HashSet<DateTime>();

            //NEW YEARS 
            DateTime newYearsDate = AdjustForWeekendHoliday(new DateTime(year, 1, 1).Date);
            holidays.Add(newYearsDate);

            //MEMORIAL DAY  -- last monday in May 
            DateTime memorialDay = new DateTime(year, 5, 31);
            DayOfWeek dayOfWeek = memorialDay.DayOfWeek;
            while (dayOfWeek != DayOfWeek.Monday)
            {
                memorialDay = memorialDay.AddDays(-1);
                dayOfWeek = memorialDay.DayOfWeek;
            }
            holidays.Add(memorialDay.Date);

            //INDEPENCENCE DAY 
            DateTime independenceDay = AdjustForWeekendHoliday(new DateTime(year, 7, 4).Date);
            holidays.Add(independenceDay);

            //LABOR DAY -- 1st Monday in September 
            var laborDay = FindDay(year, 9, DayOfWeek.Monday, 1);

            holidays.Add(new DateTime(year, 9, laborDay));

            //THANKSGIVING DAY - 4th Thursday in November 
            var thanksgiving = (from day in Enumerable.Range(1, 30)
                                where new DateTime(year, 11, day).DayOfWeek == DayOfWeek.Thursday
                                select day).ElementAt(3);
            DateTime thanksgivingDay = new DateTime(year, 11, thanksgiving);
            holidays.Add(thanksgivingDay.Date);

            //CHRISTMAS DAY
            DateTime christmasDay = AdjustForWeekendHoliday(new DateTime(year, 12, 25).Date);
            holidays.Add(christmasDay);

            // MLK JR BIRTHDAY
            var mlkBirthday = FindDay(year, 1, DayOfWeek.Monday, 3);

            holidays.Add(new DateTime(year, 1, mlkBirthday));

            // WASHINGTON'S BIRTHDAY
            var washingtonBirthday = FindDay(year, 2, DayOfWeek.Monday, 3);

            holidays.Add(new DateTime(year, 2, washingtonBirthday));

            // COLUMBUS DAY
            var columbusBirthday = FindDay(year, 10, DayOfWeek.Monday, 2);

            holidays.Add(new DateTime(year, 10, columbusBirthday));

            // VETERANS DAY
            var veteransDay = AdjustForWeekendHoliday(new DateTime(year, 11, 11).Date);
            holidays.Add(veteransDay);

            return holidays;
        }

        public static DateTime AdjustForWeekendHoliday(DateTime holiday)
        {
            if (holiday.DayOfWeek == DayOfWeek.Saturday)
            {
                return holiday.AddDays(-1);
            }
            else if (holiday.DayOfWeek == DayOfWeek.Sunday)
            {
                return holiday.AddDays(1);
            }
            else
            {
                return holiday;
            }
        }

        public enum HolidayIsOnWeekdayOtherThanMondayPushToNextWeek
        {
            Tuesday,
            Wednesday,
            Thursday,
            Friday
        };

        //For example to find the day for 2nd Friday, February, 2016
        //=>call FindDay(2016, 2, DayOfWeek.Friday, 2)
        public static int FindDay(int year, int month, DayOfWeek day, int occurance)
        {
            if (occurance == 0 || occurance > 5)
                throw new Exception("Occurance is invalid");

            DateTime firstDayOfMonth = new DateTime(year, month, 1);
            //Substract first day of the month with the required day of the week 
            var daysneeded = (int)day - (int)firstDayOfMonth.DayOfWeek;
            //if it is less than zero we need to get the next week day (add 7 days)
            if (daysneeded < 0) daysneeded = daysneeded + 7;
            //DayOfWeek is zero index based; multiply by the Occurance to get the day
            var resultedDay = (daysneeded + 1) + (7 * (occurance - 1));

            if (resultedDay > (firstDayOfMonth.AddMonths(1) - firstDayOfMonth).Days)
                throw new Exception(String.Format("No {0} occurance of {1} in the required month", occurance, day.ToString()));
            return resultedDay;
        }
    }
{% endhighlight %}
