---
layout: post
title:  "C# Holiday Hashset"
date:   2016-11-06 22:52:21
categories: jekyll post
---
Recently I had to figure out a way to disable  an automated process that would 
run on a daily basis.  Since the functionality of the Windows Task Scheulder 
doesn't easily support something like this I tried to think of a "set it and
forget it" solution.

For my purposes I had to disable my program from running based on the Federal
Reserve holiday list.

At the beginning of your program you are able to pass the current year to
the hashset, and it will return a list of the holidays you've specified. 

Depending on the holiday you would like to add to the hashset I've included a
few ways you can easily find the date for each year.


1. AdjustForWeekendHoliday() - Will push the observed holiday date to Monday if
   the holidays actual date is on a Sunday, and will move the observed holiday
   to Friday if the actual date falls on a Saturday.

2. FindDay() - Is able to find a holiday if it occurs on a certain 2nd or 3rd
   Monday of a Month.

Making use of both of these functions it's quick and easy to add a day to the
hashset.

I'll most likley use this in future projects that are required to not run on
certain days, and I hope others find this snippet useful as well.

{% highlight c# %}
namespace HolidayHashSett
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
